import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { LoadingIcon } from "@/icons";
import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteSell: React.FC<ModalDeleteProps> = ({ isOpen, onClose }) => {
  // const deleteCampaign = useDeleteCampaign();
  // const { selectedSupplier } = useSupplierStore((state) => ({
  //   selectedSupplier: state.selectedSupplier,
  // }));

  const [isLoading, _setIsLoading] = React.useState(false);

  // const handleDeleteCampaign = () => {
  //   setIsLoading(true);
  //   deleteCampaign
  //     .mutateAsync(selectedCampaign?.uid || "")
  //     .then(() => {
  //       showSuccessToast("Campaign deleted successfully");
  //       onClose();
  //     })
  //     .catch((errors) => {
  //       const errorMessage =
  //         errors?.response?.data?.errors?.[0]?.message || "An error occurred";
  //       showErrorToast(errorMessage);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

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
            onClick={() => console.log("Delete Campaign")}
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
