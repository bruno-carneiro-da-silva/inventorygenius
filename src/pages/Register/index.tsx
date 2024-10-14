import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/Input";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { LoadingIcon } from "@/icons";
import { useRegister } from "@/pages/Register/hooks/useRegister";
import { getValueByKey } from "@/utils/utils";
import { Autocomplete } from "@react-google-maps/api";
import cx from "classnames";
import {
  Building2,
  CircleUserRound,
  Eye,
  EyeOff,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { FieldError, FormProvider } from "react-hook-form";
import MaskedTextInput from "./components/PhoneInput";

export default function Register() {
  const { methods, onSubmit, isLoading } = useRegister();
  const [visible, setVisible] = useState(false);

  const {
    formState: { errors },
  } = methods;
  const fieldError = getValueByKey(errors, "password") as
    | FieldError
    | undefined;
  const isFieldError = fieldError && fieldError.message;

  const handleShowPassword = () => {
    setVisible(!visible);
  };

  return (
    <LoginLayoutPayload>
      <Header />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Crie uma conta para sua empresa
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col rounded-full space-y-4 text-left"
          >
            <div className="text-md font-semibold">Admin</div>
            <TextInput
              type="text"
              name="firstName"
              placeholder="Nome"
              icon={<CircleUserRound />}
            />
            <TextInput
              type="text"
              name="lastName"
              placeholder="Sobrenome"
              icon={<CircleUserRound />}
            />
            <TextInput
              type="email"
              name="emailAdmin"
              placeholder="E-mail"
              icon={<Mail />}
            />
            <MaskedTextInput
              type="text"
              name="phoneNumberAdmin"
              placeholder="Telefone"
              icon={<Phone />}
            />
            <div
              className={cx(
                "relative bg-white rounded-full border border-gray-300 p-2 w-full",
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
            <div className="text-md font-semibold">Empresa</div>
            <TextInput
              type="text"
              name="nameCompany"
              placeholder="Nome da empresa"
              icon={<Building2 />}
            />
            <TextInput
              type="email"
              name="emailCompany"
              placeholder="Email da empresa"
              icon={<Mail />}
            />
            <MaskedTextInput
              type="text"
              name="phoneNumberCompany"
              placeholder="Telefone da empresa"
              icon={<Phone />}
            />
            <div className="text-md font-semibold">Endereço</div>
            <Autocomplete>
              <TextInput
                type="text"
                name="addressCompany"
                placeholder="Digite seu endereço"
                icon={<MapPinned />}
              />
            </Autocomplete>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingIcon className="items-center m-auto justify-center" />
              ) : (
                "Criar"
              )}
            </Button>
            <Checkbox
              labelClassName="text-xs"
              name="terms"
              label="Você aceita receber mensagens via WhatsApp e SMS"
            />
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
