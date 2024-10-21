import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import TextInput from "@/components/Input";
import { Coins, PackageOpen, Plus, ReceiptText, User } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateProduct() {
  const methods = useForm();

  const handleCreateCategory = () => {
    console.log("Adicionando categoria");
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
                name="email"
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
                  name="category"
                  placeholder="Jeans"
                  onChange={(value) => console.log(value)}
                  options={[
                    { label: "Jeans", value: "jeans" },
                    { label: "Masculino", value: "masculino" },
                    { label: "Feminino", value: "feminino" },
                  ]}
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

            {/* <TextInput
              label="CNPJ *"
              type="textarea"
              name="address"
              icon={<StickyNote />}
              placeholder="Rua fulano de tal, 123"
              className="w-full"
            />
            <TextInput
              label="Nacionalidade *"
              name="dateOfBirth"
              icon={<Flag />}
              placeholder="05/04/1997"
              className="w-full"
            /> */}
          </div>
        </div>
        {/* <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg mb-5 rounded-lg mt-0">
          <div className="absolute top-0 bg-primary-dark flex items-center text-white font-bold text-2xl -left-[1px] w-[1280px] rounded-t-lg h-16 bg-cover bg-center z-0">
            <span className="ml-5">Especialidades</span>
          </div>
          <div className="relative grid grid-cols-2 gap-8 w-full items-start mt-24">
            <div className="space-y-5">
              <TextInput
                label="Nicho *"
                name="name"
                icon={<Shirt />}
                placeholder="Roupas femininas"
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label="Inicio de cadastro *"
                  name="lastName"
                  icon={<Calendar />}
                  placeholder="Nome"
                  className="w-ful"
                />
                <TextInput
                  label="Fim do cadastro *"
                  name="lastName"
                  icon={<Calendar />}
                  placeholder="Nome"
                  className="w-ful"
                />
              </div>
            </div>
            <TextInput
              label="Cidade *"
              name="city"
              icon={<Map />}
              placeholder="Nome"
              className="w-ful"
            />
          </div>
        </div> */}

        <div className="flex container ml-11 justify-end gap-3 mb-10">
          {/* <button
            type="submit"
            className="bg-white text-primary-dark border border-primary-dark rounded-full px-6 py-3"
          >
            Salvar rascunho
          </button> */}
          <button
            type="submit"
            className="bg-primary-dark text-white border border-primary-dark rounded-full px-6 py-3"
          >
            Enviar
          </button>
        </div>
      </FormProvider>
    </React.Fragment>
  );
}
