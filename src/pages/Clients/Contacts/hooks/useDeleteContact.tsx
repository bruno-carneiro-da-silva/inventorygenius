import { useState } from "react";

type useDeleteContactProps = {
  onClose: () => void;
};

export default function useDeleteContactHook({}: // onClose,
useDeleteContactProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { selectedContact } = useMyContactStore();
  // const companyUid = useCompanyStore((state) => state.company?.data.uId || "");

  // const deleteContact = useDeleteContact();

  const handleSubmit = () => {
    setIsLoading(true);
    // const finalDeletePayload = {
    //   // companyUid: companyUid,
    //   customerUid: selectedContact?.uId || "",
    // };

    // deleteContact
    //   .mutateAsync(() => console.log("finalDeletePayload"))
    //   .then(() => {
    //     showSuccessToast("Contact deleted successfully");
    //     onClose();
    //   })
    //   .catch((errors) => {
    //     const errorMessage =
    //       errors?.response?.data?.errors?.[0]?.message || "An error occurred";
    //     showErrorToast(errorMessage);
    //     onClose();
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };
  return {
    handleSubmit,
    isLoading,
  };
}
