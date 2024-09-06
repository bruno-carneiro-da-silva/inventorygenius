import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import TextInput from "@/components/Input";
import {
  Calendar,
  Flag,
  Mail,
  Map,
  MapPinned,
  Phone,
  Shirt,
  StickyNote,
  User,
} from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateSupplier() {
  const methods = useForm();
  return (
    <React.Fragment>
      <DashboardLayout />
      <FormProvider {...methods}>
        <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg mb-5 rounded-lg mt-0">
          <div className="absolute top-0 bg-primary-dark flex items-center text-white font-bold text-2xl -left-[1px] w-[1280px] rounded-t-lg h-16 bg-cover bg-center z-0">
            <span className="ml-5">Detalhes pessoais</span>
          </div>
          <div className="relative grid grid-cols-2 gap-8 w-full items-start mt-24">
            <div className="space-y-5">
              <TextInput
                label="Primeiro Nome *"
                name="name"
                icon={<User />}
                placeholder="Nome"
                className="w-full"
              />
              <TextInput
                label="Sobrenome *"
                name="lastName"
                icon={<User />}
                placeholder="Nome"
                className="w-ful"
              />
            </div>
            <div className="space-y-5">
              <TextInput
                label="Email *"
                name="email"
                icon={<Mail />}
                placeholder="Email"
                className="w-full"
              />
              <TextInput
                label="Telefone *"
                name="phone"
                icon={<Phone />}
                placeholder="Telefone"
                className="w-full"
              />
            </div>
            <div className="space-y-5">
              <TextInput
                label="Endereço *"
                type="textarea"
                name="address"
                icon={<MapPinned />}
                placeholder="Rua fulano de tal, 123"
                className="w-full"
              />
              <TextInput
                label="Data de nascimento *"
                name="dateOfBirth"
                icon={<Calendar />}
                placeholder="05/04/1997"
                className="w-full"
              />
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
                  Arraste e solte ou clique para adicionar
                </button>
              </div>
            </div>

            <TextInput
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
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg mb-5 rounded-lg mt-0">
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
        </div>

        <div className="flex container ml-11 justify-end gap-3 mb-10">
          <button
            type="submit"
            className="bg-white text-primary-dark border border-primary-dark rounded-full px-6 py-3"
          >
            Salvar rascunho
          </button>
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
