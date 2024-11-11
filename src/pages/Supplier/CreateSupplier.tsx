import ModalCropImage from "@/components/Dashboard/components/ModalCropImage";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
// import DateTextInput from "@/components/DateInput/DateInput";
import TextInput from "@/components/Input";
import { maskCNPJ } from "@/utils/functions";
import { Autocomplete } from "@react-google-maps/api";
import { Mail, Map, Shirt, StickyNote, User } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MaskedTextInput from "../Register/components/PhoneInput";
import useCreateSuppliers from "./hooks/useSuppliers";

export default function CreateSupplier() {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const { methods, onLoad, onPlaceChanged, updateFile, onSubmit } =
    useCreateSuppliers({ onClose });

  return (
    <React.Fragment>
      <DashboardLayout />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative max-w-7xl mx-auto border p-6 bg-white shadow-lg mb-5 rounded-lg mt-0">
            <div className="absolute top-0 bg-primary-dark flex items-center text-white font-bold text-2xl -left-[1px] w-[1280px] rounded-t-lg h-16 bg-cover bg-center z-0">
              <span className="ml-5">Detalhes pessoais</span>
            </div>
            <div className="relative grid grid-cols-2 gap-8 w-full items-start mt-24">
              <div className="space-y-5">
                <TextInput
                  label="Nome *"
                  name="name"
                  icon={<User />}
                  placeholder="Nome"
                  className="w-full"
                />
                <TextInput
                  label="Sobrenome *"
                  name="lastName"
                  icon={<User />}
                  placeholder="Sobrenome"
                  className="w-full"
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
                <MaskedTextInput
                  name="phone"
                  label="Telefone *"
                  placeholder="(00) 00000-0000"
                  classNameIcon="text-gray-400"
                />
              </div>
              <div className="space-y-5">
                <Autocomplete
                  className="w-full"
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <TextInput
                    name="address"
                    label="Endereço completo *"
                    placeholder="Rua fulano de tal, 239"
                    classNameIcon="text-gray-400"
                  />
                </Autocomplete>
                <TextInput
                  label="CNPJ *"
                  type="textarea"
                  name="document"
                  onChange={(e) => {
                    methods.setValue("document", maskCNPJ(e.target.value));
                  }}
                  icon={<StickyNote />}
                  placeholder="00.000.000/0000-00"
                  className="w-full"
                />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col col-span-12 space-y-5 overflow-hidden">
                  <ModalCropImage updateFile={updateFile} />
                </div>
              </div>
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
                  name="niche"
                  icon={<Shirt />}
                  placeholder="Roupas femininas"
                  className="w-full"
                />
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
              className="bg-primary-dark text-white border border-primary-dark rounded-full px-6 py-3"
            >
              Enviar
            </button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
