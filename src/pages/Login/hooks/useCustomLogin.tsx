import { showErrorToast } from "@/components/Toast";
import { useLogin } from "@/queries/account/index";
import { useUserStore } from "@/stores/user";
import { setIsPersistent } from "@/utils/sessionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type LoginCredentials = {
  username: string;
  password: string;
  isPersistent?: boolean;
};

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  username: yup.string().required("Usuário é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatoria")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  isPersistent: yup.boolean(),
});

export default function useCustomLogin() {
  const navigate = useNavigate();
  const login = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });
  const { setLogin } = useUserStore();

  const onSubmit = (credentials: LoginCredentials) => {
    setIsLoading(true);
    login
      .mutateAsync(credentials)
      .then((res) => {
        setLogin(res);
        // setIsPersistent(credentials?.isPersistent);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error || "Ocorreu um erro";
        showErrorToast(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    navigate,
    methods,
    onSubmit,
    isLoading,
  };
}
