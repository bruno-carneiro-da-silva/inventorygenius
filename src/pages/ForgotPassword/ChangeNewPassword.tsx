import Button from "@/components/Button";
import TextInput from "@/components/Input";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { LoadingIcon } from "@/icons";
import { Binary, LockKeyhole, Phone } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useChangePassword from "./hooks/useChangePassword";
import MaskedTextInput from "../Register/components/PhoneInput";

export default function ChangeNewPassword() {
  const { methods, isLoading, onSubmit } = useChangePassword();

  return (
    <LoginLayoutPayload>
      <Header />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Recupere sua senha</h1>
        {/* <div className="text-center text-sm font-light ">
          Insert your active e-mail to receive our token in order to reset your
          password
        </div> */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <TextInput
              type="text"
              name="code"
              placeholder="Código"
              icon={<Binary />}
            />
            <MaskedTextInput
              name="phoneNumberAdmin"
              type="text"
              placeholder="Telefone"
              icon={<Phone />}
            />
            <TextInput
              type="password"
              name="newPassword"
              placeholder="Nova senha"
              icon={<LockKeyhole />}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingIcon className="" /> : "Enviar"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
