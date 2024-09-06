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
  phoneNumber: string;
  password: string;
  isPersistent: boolean;
};
const cleanPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};

const schema: yup.ObjectSchema<LoginCredentials> = yup.object({
  phoneNumber: yup
    .string()
    .required("Phone is required")
    .test(
      "is-valid-phone",
      "Phone number must be between 10 and 15 digits",
      (value) => {
        const cleaned = cleanPhoneNumber(value || "");
        return /^\d{10,15}$/.test(cleaned);
      }
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  isPersistent: yup.boolean().required(),
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
        setIsPersistent(credentials.isPersistent);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.errors?.[0]?.message || "An error occurred";
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
