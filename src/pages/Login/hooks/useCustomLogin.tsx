import { showErrorToast } from "@/components/Toast";
import { useLogin } from "@/queries/account/index";
import { useUserStore } from "@/stores/user";
import { unmaskPhone } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type LoginCredentials = {
  phoneNumberAdmin: string;
  password: string;
  isPersistent?: boolean;
};

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  phoneNumberAdmin: yup.string().required("Telefone é obrigatório"),
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
  const { setLogin, setIsPersistent } = useUserStore();

  const onSubmit = (credentials: LoginCredentials) => {
    setIsLoading(true);

    const finalPayload = {
      ...credentials,
      phoneNumberAdmin: unmaskPhone(credentials.phoneNumberAdmin),
    };
    
    login
      .mutateAsync(finalPayload)
      .then((res) => {
        setLogin(res);
        setIsPersistent(res.user?.terms || false);
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
