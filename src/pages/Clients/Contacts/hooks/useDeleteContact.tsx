import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { useDeleteContact } from "@/queries/contact";
import { useMyContactStore } from "@/stores/contacts";
import { useState } from "react";

type useDeleteContactProps = {
  onClose: () => void;
};

export default function useDeleteContactHook({
  onClose,
}: useDeleteContactProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedContact } = useMyContactStore();

  const deleteContact = useDeleteContact();

  const handleSubmit = () => {
    setIsLoading(true);
    const finalDeletePayload = {
      id: selectedContact?.id || "",
    };

    deleteContact
      .mutateAsync(finalDeletePayload)
      .then(() => {
        showSuccessToast("Contato deletado com sucesso");
        onClose();
      })
      .catch((errors) => {
        const errorMessage =
          errors?.response?.data?.errors?.[0]?.message ||
          "Ocorreu um erro interno";
        showErrorToast(errorMessage);
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    handleSubmit,
    isLoading,
  };
}
