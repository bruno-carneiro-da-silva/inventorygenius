import Logo from "@/assets/logo_transparent.png";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { LoginLayoutPayload } from "@/components/Login/LoginLayout";
import { LoadingIcon } from "@/icons";
import useCustomLogin from "@/pages/Login/hooks/useCustomLogin";
import { getValueByKey } from "@/utils/utils";
import cx from "classnames";
import { Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { FieldError, FormProvider } from "react-hook-form";
import MaskedTextInput from "../Register/components/PhoneInput";

export default function Login() {
  const { navigate, methods, onSubmit, isLoading } = useCustomLogin();
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
      <div className="flex flex-col space-y-2">
        <img
          src={Logo}
          alt="logo"
          className="w-36 self-center bg-primary-dark rounded-full"
        />
        <div className="text-sm font-light">
          Domine a conectividade com a Techne para traçar seu caminho rumo ao
          sucesso no Dashboard nesta emocionante aventura digital.
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Realize o login na sua conta
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <MaskedTextInput
              name="phoneNumberAdmin"
              type="text"
              placeholder="Telefone"
              icon={<User />}
            />
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

            <div className="flex flex-row justify-between">
              <Checkbox name="isPersistent" label="Lembrar de mim" />
              <button
                type="button"
                onClick={() => navigate("/recovery-password")}
                className="text-sm text-primary-dark font-bold"
              >
                Esqueceu a senha?
              </button>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingIcon className="items-center h-6 w-6 m-auto justify-center" />
              ) : (
                "Entrar"
              )}
            </Button>
            <div className="flex flex-row space-x-1 self-center text-sm">
              <div className="text-sm">Ainda não possui conta?</div>
              <button
                type="button"
                onClick={() => navigate("/cadastrar")}
                className="text-sm text-primary-dark font-bold"
              >
                Criar conta
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </LoginLayoutPayload>
  );
}
