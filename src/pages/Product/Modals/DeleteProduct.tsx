import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useDeleteProduct } from "@/queries/product";
import { useProductStore } from "@/stores/product";
import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteProduct: React.FC<ModalDeleteProps> = ({
  isOpen,
  onClose,
}) => {
  const deleteProduct = useDeleteProduct();
  const { product } = useProductStore((state) => ({
    product: state.product,
  }));

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteProduct = () => {
    setIsLoading(true);
    deleteProduct
      .mutateAsync(product?.id || "")
      .then(() => {
        showSuccessToast("Product deleted successfully");
        onClose();
      })
      .catch((errors: any) => {
        const errorMessage =
          errors?.response?.data?.errors?.message || "An error occurred";
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
          Deletar Product
        </div>
        <div className="text-base font-light text-gray-500">
          Tem certeza que deseja deletar esse produto?
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
            onClick={handleDeleteProduct}
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

export default ModalDeleteProduct;
