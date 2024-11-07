import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import DateTextInput from "@/components/DateInput/DateInput";
import TextInput from "@/components/Input";
import { maskCNPJ } from "@/utils/functions";
import { Autocomplete } from "@react-google-maps/api";
import { Flag, Mail, Map, Shirt, StickyNote, User } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MaskedTextInput from "../Register/components/PhoneInput";
import useCreateSuppliers from "./hooks/useSuppliers";
import ModalCropImage from "@/components/Dashboard/components/ModalCropImage";

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
                  label="Phone"
                  placeholder="+1 123 456 7890"
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
                    label="Endereço completo"
                    placeholder="Rua fulano de tal, 239"
                    classNameIcon="text-gray-400"
                  />
                </Autocomplete>
                <DateTextInput
                  name="dateOfBirth"
                  label="Data de nascimento"
                  placeholder="1997/06/03"
                />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col col-span-12 space-y-5 overflow-hidden">
                  <ModalCropImage updateFile={updateFile} />
                </div>
                {/* <div className="flex flex-col">
                  <label className="text-gray-500 font-bold mb-2">Foto *</label>
                  <input {...methods.register('photo')} type="file" />
                  <button
                    type="button"
                    className="w-40 h-40 p-3 border-2 border-spacing-2 text-gray-500 border-primary-dark/20 border-dashed focus:border-dashed focus:outline-none"
                    onClick={() => {
                      // Lógica futura para acionar o crop de imagem
                      alert('TODO')
                    }}
                  >
                    Arraste e solte ou clique para adicionar
                  </button>
                </div> */}
              </div>

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
              <TextInput
                label="Nacionalidade *"
                name="nationality"
                icon={<Flag />}
                placeholder="Brasileiro/Estadunidense/Japonês"
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
                  name="niche"
                  icon={<Shirt />}
                  placeholder="Roupas femininas"
                  className="w-full"
                />
                <div className="grid grid-cols-2 gap-2">
                  <DateTextInput
                    name="contract_start"
                    label="Inicio de cadastro *"
                    placeholder="1999/06/03"
                  />

                  <DateTextInput
                    name="contract_end"
                    label="Fim do cadastro *"
                    placeholder="2000/06/03"
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
              type="button"
              className="bg-white text-primary-dark border border-primary-dark rounded-full px-6 py-3"
              onClick={() => alert("TODO")}
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
        </form>
      </FormProvider>
    </React.Fragment>
  );
}
