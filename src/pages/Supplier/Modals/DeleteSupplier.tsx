import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useDeleteSupplier } from "@/queries/supplier";
import { useSupplierStore } from "@/stores/supplier";
import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteSupplier: React.FC<ModalDeleteProps> = ({
  isOpen,
  onClose,
}) => {
  const deleteSupplier = useDeleteSupplier();
  const { selectedSupplier } = useSupplierStore((state) => ({
    selectedSupplier: state.selectedSupplier,
  }));

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteSupplier = () => {
    setIsLoading(true);
    deleteSupplier
      .mutateAsync(selectedSupplier?.id || "")
      .then(() => {
        showSuccessToast("Fornecedor deletado com sucesso");
        onClose();
      })
      .catch((errors) => {
        const errorMessage =
          errors?.response?.data?.errors?.[0]?.message ||
          "Ocorreu um erro interno";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteButtonText = isLoading ? <LoadingIcon /> : "Deletar";

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!w-4/12">
      <div className="place-items-center rounded-sm flex flex-col space-y-10">
        <div className="text-2xl font-semibold text-gray-500">
          Deletar Fornecedor
        </div>
        <div className="text-base font-light text-gray-500">
          Tem certeza que deseja deletar esse fornecedor?
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            className="bg-white border border-primary-dark !text-primary-dark hover:!text-white font-medium w-28"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleDeleteSupplier}
            disabled={isLoading}
            className="bg-primary-dark text-white w-28 font-medium"
          >
            {deleteButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteSupplier;
