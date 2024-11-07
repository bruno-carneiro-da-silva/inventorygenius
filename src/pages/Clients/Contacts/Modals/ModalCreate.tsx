import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { LoadingIcon } from "@/icons";
import { ContactDetailResponse, ContactDetails } from "@/queries/contact/types";
import { Autocomplete } from "@react-google-maps/api";
import React from "react";
import { FormProvider } from "react-hook-form";
import useCreateContacts from "@/pages/Clients/Contacts/hooks/useContacts";
import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import DateTextInput from "@/components/DateInput/DateInput";

interface ModalCreateContactProps {
  isOpen: boolean;
  editContact: ContactDetailResponse | null;
  onClose: () => void;
  onSaved?: (customer: ContactDetails) => void;
}

const ModalCreateContact: React.FC<ModalCreateContactProps> = ({
  isOpen,
  editContact,
  onClose,
  onSaved,
}) => {
  const { methods, onSubmit, isLoading, onLoad, onPlaceChanged } =
    useCreateContacts({
      editContact,
      onClose,
      onSaved,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={editContact ? "Editar cliente" : "Nova cliente"}
        subtitle={
          editContact
            ? undefined
            : "Crie um novo cliente para fazer parte da sua lista"
        }
        onClose={onClose}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" bg-white p-4 rounded-sm flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <TextInput name="name" label="Nome" placeholder="Jonh" />
            </div>

            <TextInput
              name="email"
              label="Email"
              placeholder="jonhdoe@gmail.com"
            />

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

            <div className="flex flex-row space-x-2">
              <MaskedTextInput
                name="phoneNumber"
                label="Phone"
                placeholder="+1 123 456 7890"
                classNameIcon="text-gray-400"
              />
              <DateTextInput
                name="dateOfBirth"
                label="Data de nascimento"
                placeholder="03/06/1997"
              />
            </div>
            <TextInput
              name="zipCode"
              label="CEP da rua"
              placeholder="13037"
              classNameIcon="text-gray-400"
            />
            <div className="flex flex-row-reverse space-x-reverse space-x-2">
              <Button
                className="bg-primary-dark border border-primary-dark !text-white hover:!text-white font-medium w-24"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingIcon className="" />
                ) : editContact ? (
                  "Editar"
                ) : (
                  "Criar"
                )}
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

export default ModalCreateContact;
