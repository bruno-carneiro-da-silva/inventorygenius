import { showErrorToast, showSuccessToast } from "@/components/Toast";
import { usePhoneNumberReset } from "@/queries/account";
import { NumberResetProp } from "@/queries/account/types";
import { unmaskPhone } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<NumberResetProp> = yup.object({
  phoneNumberAdmin: yup.string().required("Telefone é obrigatório"),
  newPassword: yup.string().required("Senha é obrigatória"),
  code: yup.string().required("Código é obrigatório"),
});

export default function useChangePassword() {
  const navigate = useNavigate();
  const methods = useForm<NumberResetProp>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const changePassword = usePhoneNumberReset();

  const onSubmit = (password: NumberResetProp) => {
    setIsLoading(true);

    const finalPayload = {
      ...password,
      phoneNumberAdmin: unmaskPhone(password.phoneNumberAdmin),
    };
    changePassword
      .mutateAsync(finalPayload)
      .then((res) => {
        showSuccessToast(res.message);
        navigate("/confirm-password");
        setIsLoading(false);
      })
      .catch((err: any) => {
        const error = err?.response?.data?.error;
        showErrorToast(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    methods,
    navigate,
    onSubmit,
    isLoading,
  };
}
