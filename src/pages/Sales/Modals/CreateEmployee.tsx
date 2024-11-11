import Button from "@/components/Button";
import TextInput from "@/components/Input";
import Modal from "@/components/Modal";
import ModalHeader from "@/components/ModalHeader";
import { LoadingIcon } from "@/icons";
import MaskedTextInput from "@/pages/Register/components/PhoneInput";
import { Employee } from "@/queries/employee/types";
import cx from "classnames";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import useCreateEmployee from "../hooks/useEmployee";
import { Autocomplete } from "@react-google-maps/api";

interface ModalCreateEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (employee: Employee) => void;
}

const ModalCreateEmployee: React.FC<ModalCreateEmployeeProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    isLoading,
    methods,
    isFieldError,
    handleShowPassword,
    visible,
    fieldError,
    onSubmit,
    onLoad,
    onPlaceChanged,
  } = useCreateEmployee({
    onClose,
    onSave,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Nova funcionário"
        subtitle="Crie um novo funcionário para fazer parte da sua lista"
        onClose={onClose}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className=" bg-white p-4 rounded-sm flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <TextInput name="name" label="Nome" placeholder="Jonh" />
            </div>
            <div className="flex flex-row space-x-3 items-center">
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
              <TextInput
                name="email"
                label="Email"
                placeholder="jonhdoe@gmail.com"
              />
            </div>

            <div className="flex flex-row space-x-2">
              <MaskedTextInput
                name="phone"
                label="Phone"
                placeholder="(00) 00000-0000"
                classNameIcon="text-gray-400"
              />
              <TextInput
                name="userName"
                label="Usuário"
                placeholder="jonhdoe"
              />
            </div>
            <div
              className={cx(
                "relative bg-white border border-gray-300 rounded-full p-2 w-full",
                isFieldError && "border-red-400"
              )}
            >
              <div
                className="absolute rounded-full inset-y-0 left-0 flex items-center pl-4 cursor-pointer"
                onClick={handleShowPassword}
              >
                {visible ? <Eye /> : <EyeOff />}
              </div>
              <input
                type={visible ? "text" : "password"}
                className="rounded-full p-2 w-full pl-10 focus:outline-none focus:border-transparent"
                placeholder="Senha"
                {...methods.register("password")}
              />
            </div>
            {isFieldError && (
              <span className="text-red-400 text-left text-sm">
                {fieldError?.message}
              </span>
            )}
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

export default ModalCreateEmployee;
