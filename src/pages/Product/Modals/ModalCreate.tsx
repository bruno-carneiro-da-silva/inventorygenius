import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { LoadingIcon } from "@/icons";
// import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import { CategoryDetails } from "@/queries/category/types";
import React from "react";
import { FormProvider } from "react-hook-form";
import useCreateCategories from "../hooks/useCreateCategory";

interface ModalCreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (category: CategoryDetails) => void;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const { methods, onSubmit, isLoading } = useCreateCategories({
    onClose,
    onSaved,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Novo cliente"
        subtitle="Crie um novo cliente para fazer parte da sua lista"
        onClose={onClose}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" bg-white p-4 rounded-sm flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <TextInput
                name="name"
                label="Nome da Categoria"
                placeholder="Masculino"
                classNameIcon="text-gray-400"
              />
            </div>
            <div className="flex flex-row-reverse space-x-reverse space-x-2">
              <Button
                className="bg-primary-dark border border-primary-dark !text-white hover:!text-white font-medium w-24"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingIcon className="" /> : "Criar"}
              </Button>
              <Button
                className="bg-white border border-primary-dark !text-primary-dark hover:!text-white font-medium w-24"
                onClick={onClose}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalCreateCategory;
