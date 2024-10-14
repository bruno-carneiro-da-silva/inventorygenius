import Button from "@/components/Button";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import Header from "@/components/LogoHeader";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ConfirmAccountCreated() {
  const navigate = useNavigate();
  const methods = useForm();
  return (
    <LoginLayoutPayload>
      <Header />
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Conta criada com sucesso!
        </h1>
        <div className="text-center text-sm font-light ">
          Agora você pode fazer login com sua nova conta
        </div>
        <FormProvider {...methods}>
          <form className="flex flex-col space-y-4">
            <Button type="submit" onClick={() => navigate("/")}>
              Ir para o login
            </Button>
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
