import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useDeleteSell } from "@/queries/sales";
import { useSalesStore } from "@/stores/sales";
import { AxiosError } from "axios";
import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteSell: React.FC<ModalDeleteProps> = ({ isOpen, onClose }) => {
  const deleteCampaign = useDeleteSell();
  const { selectedSell } = useSalesStore((state) => ({
    selectedSell: state.selectedSell,
  }));

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteSell = () => {
    setIsLoading(true);
    deleteCampaign
      .mutateAsync(selectedSell?.uId || "")
      .then(() => {
        showSuccessToast("Venda deletada com successo");
        onClose();
      })
      .catch((err: any) => {
        const errorMessage =
          err?.response?.data?.errors?.message || "Ocorreu um erro interno";
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
          Deletar Venda
        </div>
        <div className="text-base font-light text-gray-500">
          Tem certeza que deseja deletar essa venda?
        </div>
        <div className="flex flex-row space-x-2">
          <Button
            className="bg-white border border-primary-dark !text-primary-dark hover:!text-white font-medium w-28"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleDeleteSell}
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

export default ModalDeleteSell;
