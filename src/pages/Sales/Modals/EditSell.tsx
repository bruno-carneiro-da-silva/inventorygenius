import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { LoadingIcon } from "@/icons";
import Checkbox from "@/components/Checkbox";
import CustomSelect from "@/components/CustomSelect";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider } from "react-hook-form";
import useCreateSales from "../hooks/useSales";
import { X } from "lucide-react";
import { PaymentStatus } from "@/utils/enum";

interface ModalEditSellProps {
  isOpen: boolean;
  editSell: any | null;
  onClose: () => void;
  onSave?: (sell: any) => void;
}

const ModalEditSell: React.FC<ModalEditSellProps> = ({
  isOpen,
  editSell,
  onClose,
  onSave,
}) => {
  const {
    methods,
    onSubmit,
    productsResponse,
    isLoading,
    employees,
    handleSelectProduct,
    handleAddProduct,
    removeProduct,
    setQuantity,
    selectedProducts,
  } = useCreateSales({
    editSell,
    onClose,
    onSave,
  });

  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);

  useEffect(() => {
    if (editSell) {
      methods.reset({
        employeeId: editSell.employee.id,
        companyId: editSell.companyId,
        totalPrice: String(editSell.totalPrice),
        discount: editSell.discount,
        soldItems: editSell.soldItems.map(
          (item: { productId: number; qtd: number; price: number }) => ({
            productId: item.productId,
            qtd: item.qtd,
            price: item.price,
          })
        ),
        paymentStatus: editSell.paymentStatus,
      });
      setIsDiscountApplied(editSell.discount > 0);
      setDiscount(editSell.discount);
    }
  }, [editSell]);

  const totalPrice = useMemo(() => {
    const total = selectedProducts.reduce((acc, product) => {
      return acc + product.product.price * product.quantity;
    }, 0);
    return isDiscountApplied && discount
      ? total - (total * discount) / 100
      : total;
  }, [selectedProducts, isDiscountApplied, discount]);

  useEffect(() => {
    methods.setValue("totalPrice", totalPrice.toFixed(2));
  }, [totalPrice, methods]);

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
          title="Editar venda"
          subtitle="Edite a venda realizada com o cliente"
          onClose={onClose}
        />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-white p-4 rounded-sm flex flex-col space-y-4">
              <div className="flex flex-col">
                <CustomSelect
                  name="employeeId"
                  onChange={(value) =>
                    methods.setValue("employeeId", value as never)
                  }
                  options={employees?.employees?.map((item) => ({
                    value: item.id,
                    label: item.name || "Sem nome",
                  }))}
                  defaultValue={editSell ? editSell?.employee.id : undefined}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500">Status de pagamento</label>
                <CustomSelect
                  name="paymentStatus"
                  onChange={(value) =>
                    methods.setValue("paymentStatus", value as never)
                  }
                  options={[
                    { value: "PAID", label: "Pago" },
                    { value: "PENDING", label: "Pendente" },
                    { value: "CANCELED", label: "Cancelado" },
                    { value: "REFUSED", label: "Reembolsado" },
                  ]}
                  defaultValue={editSell ? editSell?.paymentStatus : undefined}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500">Preço total</label>
                <div className="text-lg font-bold">
                  {totalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>

              <div className="flex flex-row items-center space-x-2 w-full">
                <label className="text-gray-500">Teve desconto?</label>
              </div>
              <div className="flex flex-col">
                <TextInput
                  name="discount"
                  placeholder="10% de desconto"
                  classNameIcon="text-gray-400"
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
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
    </>
  );
};

export default ModalEditSell;
