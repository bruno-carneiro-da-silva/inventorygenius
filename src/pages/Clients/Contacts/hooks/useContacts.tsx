import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCreateContact } from "@/queries/contact";
import { Contact, ContactDetails } from "@/queries/contact/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import { useMyContactStore } from "@/stores/contacts";

type useContactProps = {
  onClose: () => void;
  onSaved?: (customer: ContactDetails) => void;
};
const schema: yup.ObjectSchema<Contact> = yup.object({
  companyUid: yup.string(),
  firstName: yup.string().required("First name is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  latitude: yup.number(),
  longitude: yup.number(),
  zipCode: yup.string().required("ZIP Code is required"),
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
  // const companyUid = useCompanyStore((state) => state.company?.data.uId || "");

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
      // companyUid: companyUid,
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
          errors?.response?.data?.errors?.[0]?.message || "An error occurred";
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
