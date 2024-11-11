import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { LoadingIcon } from "@/icons";
import { useDeleteEmployee } from "@/queries/employee";
import { useEmployeeStore } from "@/stores/employee";
import React from "react";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteEmployee: React.FC<ModalDeleteProps> = ({
  isOpen,
  onClose,
}) => {
  const employee = useEmployeeStore((state) => state.employee);

  const deleteEmployee = useDeleteEmployee();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteEmployee = () => {
    if (!employee) return;
    setIsLoading(true);
    deleteEmployee
      .mutateAsync(employee.id || "")
      .then(() => {
        showSuccessToast("Funcionário deletado com sucesso");
        onClose();
      })
      .catch((errors: any) => {
        const errorMessage =
          errors?.response?.data?.errors?.message || "Ocorreu um erro interno";
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
          Deletar employee
        </div>
        <div className="text-base font-light text-gray-500">
          Tem certeza que deseja deletar esse funcionário?
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
            onClick={handleDeleteEmployee}
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

export default ModalDeleteEmployee;
