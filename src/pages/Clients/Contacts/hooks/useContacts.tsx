import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCreateContact } from "@/queries/contact";
import { Contact, ContactDetails } from "@/queries/contact/types";
import { useUserStore } from "@/stores/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type useContactProps = {
  onClose: () => void;
  onSaved?: (customer: ContactDetails) => void;
};
const schema: yup.ObjectSchema<Contact> = yup.object({
  companyUid: yup.string(),
  firstName: yup.string().required("Nome é obrigatório"),
  dateOfBirth: yup.string().required("Data de nascimento é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email().required("Email é obrigatório"),
  phoneNumber: yup.string().required("Telefone é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  latitude: yup.number(),
  longitude: yup.number(),
  zipCode: yup.string().required("CEP é obrigatório"),
});

export default function useCreateContacts({
  onClose,
  onSaved,
}: useContactProps) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const contactForm = useCreateContact();
  const companyID = useUserStore((state) => state.login?.user?.id)

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Handle place changed event
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const address = place.formatted_address || "";
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setAddress(address);
        setLocation({ lat, lng });
      } else {
        showErrorToast("No geometry found for this place.");
      }
    }
  };

  const onSubmit = (payload: Contact) => {
    setIsLoading(true);
    const finalPayload = {
      ...payload,
      companyUid: companyID,
      address: address,
      latitude: location.lat,
      longitude: location.lng,
    };

    contactForm
      .mutateAsync(finalPayload)
      .then((data) => {
        showSuccessToast("Contact created successfully");
        onClose();
        if (onSaved) {
          onSaved(data.data);
        }
      })
      .catch((errors) => {
        const errorMessage =
          errors?.response?.data?.error || "An error occurred";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    methods,
    isLoading,
    onSubmit,
    address,
    onLoad,
    onPlaceChanged,
  };
}
