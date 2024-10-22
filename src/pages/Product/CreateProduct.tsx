import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useListCategories } from "@/queries/category";
import { useCategoryStore } from "@/stores/category";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import TextInput from "@/components/Input/index";
import CustomSelect from "@/components/CustomSelect";
import Button from "@/components/Button";
import { Plus, User, PackageOpen, Coins, ReceiptText } from "lucide-react";
import ModalCreateCategory from "./Modals/ModalCreate";

type FormValues = {
  name: string;
  description: string;
  price: number;
  qtd: number;
  photos: string;
  size: string;
  minStock: number;
  capacity: number;
  categoryId: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  id: yup.string().nullable(),
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  price: yup.number().required("Preço é obrigatório"),
  qtd: yup.number().required("Quantidade é obrigatória"),
  photos: yup.string().required("Foto é obrigatória"),
  size: yup.string().required("Tamanho é obrigatório"),
  minStock: yup.number().required("Estoque mínimo é obrigatório"),
  capacity: yup.number().required("Estoque máximo é obrigatório"),
  categoryId: yup.string().required("Categoria é obrigatória"),
});

export default function CreateProduct() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { data: categories } = useListCategories();
  const { setCategories, selectCategory } = useCategoryStore();

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories, setCategories]);

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleCreateCategory = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const handleCategoryChange = (value: string) => {
    selectCategory(value);
    console.log(`Selected category ID: ${value}`);
  };

  return (
    <React.Fragment>
      <DashboardLayout />
      <FormProvider {...methods}>
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
                type="textarea"
                name="capacity"
                icon={<PackageOpen />}
                placeholder="1000"
                className="w-full"
              />
            </div>
            <div className="space-y-5">
              <TextInput
                label="Preço *"
                name="price"
                icon={<Coins />}
                placeholder="R$ 100,00"
                className="w-full"
              />
              <TextInput
                label="Estoque Minimo *"
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
                <button
                  type="button"
                  className="w-40 h-40 p-3 border-2 border-spacing-2 text-gray-500 border-primary-dark/20 border-dashed focus:border-dashed focus:outline-none"
                  onClick={() => {
                    // Lógica futura para acionar o crop de imagem
                    console.log("Botão clicado para acionar o crop de imagem");
                  }}
                >
                  Clique para adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex container ml-11 justify-end gap-3 mb-10">
          <button
            type="submit"
            className="bg-primary-dark text-white border border-primary-dark rounded-full px-6 py-3"
          >
            Enviar
          </button>
        </div>
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
