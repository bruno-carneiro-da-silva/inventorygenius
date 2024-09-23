import Button from "@/components/Button";
import TextInput from "@/components/Input";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { LoadingIcon } from "@/icons";
import useRecoveryPassword from "@/pages/ForgotPassword/hooks/useRecoveryPassword";
import { Mail } from "lucide-react";
import { FormProvider } from "react-hook-form";

export default function RecoveryPassword() {
  const { methods, onSubmit, isLoading } = useRecoveryPassword();

  return (
    <LoginLayoutPayload>
      <Header />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Recupere sua senha</h1>
        <div className="text-center text-sm font-light ">
          Coloque seu email de administrador para receber um código de
          recuperação
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <TextInput
              name="emailAdmin"
              type="text"
              placeholder="Email do administrador"
              icon={<Mail />}
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
