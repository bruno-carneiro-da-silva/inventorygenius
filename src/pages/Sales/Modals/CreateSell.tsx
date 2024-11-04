import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { LoadingIcon } from "@/icons";
import Checkbox from "@/components/Checkbox";
import CustomSelect from "@/components/CustomSelect";
import MaskedPriceInput from "@/pages/Register/components/PriceInput";
import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import useCreateSell from "../hooks/useSales";
import ModalCreateEmployee from "./CreateEmployee";
import { X } from "lucide-react";

interface ModalCreateSellProps {
  isOpen: boolean;
  editSell: any | null;
  onClose: () => void;
  onSave?: (sell: any) => void;
}

const ModalCreateSell: React.FC<ModalCreateSellProps> = ({
  isOpen,
  editSell,
  onClose,
  onSave,
}) => {
  const {
    methods,
    onSubmit,
    productsResponse,
    setAddEmployeeModalOpen,
    addEmployeeModalOpen,
    isLoading,
    employees,
    handleSelectProduct,
    handleAddProduct,
    removeProduct,
    discount,
    setQuantity,
    setDiscount,
    selectedProducts,
  } = useCreateSell({
    editSell,
    onClose,
    onSave,
  });

  useEffect(() => {
    if (editSell) {
      methods.reset({
        employeeId: editSell.employeeId,
        totalPrice: editSell.totalPrice,
        discount: editSell.discount,
        soldItems: editSell.soldItems,
      });
    }
  }, [editSell]);

  const buttonText = isLoading ? (
    <LoadingIcon className="" />
  ) : editSell ? (
    "Editar"
  ) : (
    "Criar"
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader
          title="Nova venda"
          subtitle="Registre a venda realizada com o cliente"
          onClose={onClose}
        />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-white p-4 rounded-sm flex flex-col space-y-4">
              <div className="flex flex-col">
                <div className="flex flex-row mb-4 justify-between">
                  <label className="text-gray-500 self-center">
                    Selecione um funcionario ou crie um
                  </label>
                  <button
                    type="button"
                    onClick={() => setAddEmployeeModalOpen(true)}
                    className="w-48 border border-spacing-1 pl-3 pr-3 pt-1 pb-1 rounded-md border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white"
                  >
                    <span>+ Add funcionário</span>
                  </button>
                </div>
                <CustomSelect
                  name="employeeId"
                  onChange={(value) =>
                    methods.setValue("employeeId", value as never)
                  }
                  options={employees?.employees?.map((item) => ({
                    value: item.id,
                    label: item.name || "Sem nome",
                  }))}
                />
              </div>

              <MaskedPriceInput
                name="totalPrice"
                label="Preço total"
                placeholder="R$ 100,00"
                onChange={(e) => {
                  const numericValue =
                    Number(e.target.value.replace(/\D/g, "")) / 100;
                  methods.setValue("totalPrice", numericValue.toFixed(2));
                }}
              />

              <div className="flex flex-row items-center space-x-2 w-full">
                <Checkbox
                  name="discount"
                  type="checkbox"
                  onChange={(e) => setDiscount(e.target.checked)}
                />
                <label className="text-gray-500">Teve desconto?</label>
              </div>
              <div className="flex flex-col">
                {discount && (
                  <TextInput
                    name="discount"
                    placeholder="10% de desconto"
                    classNameIcon="text-gray-400"
                  />
                )}
              </div>
              <div className="flex flex-row mb-4 justify-between">
                <label className="text-gray-500 self-center">
                  Clique no botão para adicionar um produto ao carrinho
                </label>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="w-48 border border-spacing-1 pl-3 pr-3 pt-1 pb-1 rounded-md border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white"
                >
                  <span>+ Add produto</span>
                </button>
              </div>
              <div className="flex flex-row space-x-3 items-center">
                <CustomSelect
                  name="soldItems"
                  options={productsResponse?.products.map((item) => ({
                    value: item.id,
                    label: `${item.name}`,
                  }))}
                  onChange={(value) => handleSelectProduct(value)}
                  label="Pesquisar produto"
                  placeholder="Digite para pesquisar"
                />
                <TextInput
                  name="qtd"
                  label="Quantidade"
                  placeholder="20 pçs"
                  classNameIcon="text-gray-400"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col space-y-2">
                {selectedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-row space-x-2 bg-gray-200 p-1 text-sm text-gray-500 rounded-xl hover:bg-gray-400 hover:!text-white"
                  >
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="self-center"
                    >
                      <X className="h-4" />
                    </button>
                    <div className="text-center w-full">
                      {product.product.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row-reverse space-x-reverse space-x-2">
                <Button
                  className="bg-primary-dark border border-primary-dark !text-white hover:!text-white font-medium w-24"
                  type="submit"
                  disabled={isLoading}
                >
                  {buttonText}
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
      {addEmployeeModalOpen && (
        <ModalCreateEmployee
          isOpen={addEmployeeModalOpen}
          onClose={() => setAddEmployeeModalOpen(false)}
        />
      )}
    </>
  );
};

export default ModalCreateSell;
