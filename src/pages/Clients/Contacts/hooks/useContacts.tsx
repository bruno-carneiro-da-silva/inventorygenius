import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useCreateContact, useUpdateContact } from "@/queries/contact";
import { Contact, ContactDetailResponse, ContactDetails } from "@/queries/contact/types";
import { useUserStore } from "@/stores/user";
import { maskPhone } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type useContactProps = {
  editContact: ContactDetailResponse | null
  onClose: () => void;
  onSaved?: (customer: ContactDetails) => void;
};

const schema: yup.ObjectSchema<Contact> = yup.object({
  companyUid: yup.string(),
  name: yup.string().required("Nome é obrigatório"),
  dateOfBirth: yup.string().required("Data de nascimento é obrigatório"),
  email: yup.string().email().required("Email é obrigatório"),
  phoneNumber: yup.string().required("Telefone é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  latitude: yup.number(),
  longitude: yup.number(),
  zipCode: yup.string().required("CEP é obrigatório"),
});

export default function useCreateContacts({
  editContact,
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
  const updateContact = useUpdateContact();
  const createContact = useCreateContact();
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

  const onSubmit = async (payload: Contact) => {
    setIsLoading(true);
    const finalPayload = {
      ...payload,
      companyUid: companyID,
      address: address || (editContact?.address || ""),
      latitude: location.lat,
      longitude: location.lng,
    };

    try {
      let data
      if (editContact) {
        data = await updateContact.mutateAsync({ id: editContact.id, ...finalPayload })
        showSuccessToast("Contact updated successfully");
      } else {
        data = await createContact.mutateAsync(finalPayload)
        showSuccessToast("Contact created successfully");
      }
      onClose();
      if (onSaved && data) {
        onSaved(data.data);
      }
    } catch (errors) {
      const errorMessage =
        (errors as AxiosError<{ error: string }>)?.response?.data?.error || "An error occurred";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editContact) {
      methods.reset({
        name: editContact.name,
        email: editContact.email,
        phoneNumber: maskPhone(editContact.phone),
        address: editContact.address,
      })
    }
  }, [editContact])

  return {
    methods,
    isLoading,
    onSubmit,
    address,
    onLoad,
    onPlaceChanged,
  };
}
