import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import TextInput from "@/components/Input/index";
import { Coins, PackageOpen, Plus, ReceiptText, User } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import ModalCreateCategory from "./Modals/ModalCreate";
import { useProducts } from "./hooks/useProducts";
import { ProductResponse } from "@/queries/product/types";
import { LoadingIcon } from "@/icons";
import ModalCropImage from "@/components/Dashboard/components/ModalCropImage";
import { useNavigate } from "react-router-dom";

interface CreateProductProps {
  editProduct?: ProductResponse
}

export default function CreateProduct({ editProduct }: CreateProductProps) {
  const navigate = useNavigate()

  const onClose = () => {
    navigate(-1)
  }

  const { methods, onSubmit, isLoading, updateFile, categoryOptions, isCategoryModalOpen, handleCategoryChange, handleCreateCategory } = useProducts({ editProduct, onClose })

  return (
    <React.Fragment>
      <DashboardLayout />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg mb-5 rounded-lg mt-0">
            <div className="absolute top-0 bg-primary-dark flex items-center text-white font-bold text-2xl -left-[1px] w-[1280px] rounded-t-lg h-16 bg-cover bg-center z-0">
              <span className="ml-5">Detalhes do produto</span>
            </div>
            <div className="relative grid grid-cols-2 gap-8 w-full items-start mt-24">
              <div className="space-y-5">
                <TextInput
                  label="Nome do Produto *"
                  name="name"
                  icon={<User />}
                  placeholder="Nome"
                  className="w-full"
                />
                <TextInput
                  label="Estoque máximo *"
                  type="number"
                  name="capacity"
                  icon={<PackageOpen />}
                  placeholder="1000"
                  className="w-full"
                />
              </div>
              <div className="space-y-5">
                <TextInput
                  label="Preço *"
                  type="number"
                  name="price"
                  icon={<Coins />}
                  placeholder="R$ 100,00"
                  className="w-full"
                />
                <TextInput
                  label="Estoque Minimo *"
                  type="number"
                  name="minStock"
                  icon={<PackageOpen />}
                  placeholder="30"
                  className="w-full"
                />
              </div>
              <div className="space-y-5">
                <TextInput
                  label="Descrição do produto *"
                  type="textarea"
                  name="description"
                  icon={<ReceiptText />}
                  placeholder="100% algodão com gola slim"
                  className="w-full"
                />
                <div className="flex items-center justify-between mb-4">
                  <CustomSelect
                    label="Categoria *"
                    name="categoryId"
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                  />
                  <Button
                    onClick={handleCreateCategory}
                    type="button"
                    className="bg-primary-dark mt-8 pr-6 ml-4 flex items-center justify-center h-12"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col">
                  <label className="text-gray-500 font-bold mb-2">Foto *</label>
                  <div className="flex flex-col col-span-12 space-y-5 overflow-hidden">
                    <ModalCropImage
                      updateFile={updateFile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex container ml-11 justify-end gap-3 mb-10">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center bg-primary-dark text-white border border-primary-dark rounded-full px-6 py-3"
            >
              {isLoading ? <LoadingIcon /> : 'Enviar'}
            </button>
          </div>
        </form>
      </FormProvider>
      {isCategoryModalOpen && (
        <ModalCreateCategory
          isOpen={isCategoryModalOpen}
          onClose={handleCreateCategory}
        />
      )}
    </React.Fragment>
  );
}
