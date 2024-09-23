import Logo from "@/assets/react.svg";
import Button from "@/components/Button";
import TextInput from "@/components/Input";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import { Binary } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingIcon } from "@/icons";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type ValidateCodeProps = {
  code: string;
};

const schema = yup.object({
  code: yup.string().required("Codigo é obrigatório"),
});

export default function ValidateCode() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (code: ValidateCodeProps) => {
    setIsLoading(true);
    console.log(code);
  };

  return (
    <LoginLayoutPayload>
      <div className="flex flex-col space-y-2">
        <img src={Logo} alt="logo" className="w-36 self-center" />
      </div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">Valide o código</h1>
        <div className="text-center text-sm font-light ">
          Insira o código que você recebeu no seu celular
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <TextInput
              name="code"
              type="text"
              placeholder="Código"
              icon={<Binary />}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingIcon className="items-center m-auto justify-center" />
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
