import { showErrorToast } from "@/components/Toast";
import { useVerificationCode } from "@/queries/account";
import { VerificateCode } from "@/queries/account/types";
import { ApiError } from "@/types/ApiError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<VerificateCode> = yup.object({
  phoneNumber: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  code: yup.string().required("Código é obrigatório"),
});

export default function useValidateCode() {
  const navigate = useNavigate();
  const methods = useForm<VerificateCode>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const validateCode = useVerificationCode();

  const onSubmit = async (payload: VerificateCode) => {
    setIsLoading(true);
    validateCode
      .mutateAsync(payload)
      .then(() => {
        navigate("/recovery-password/reset-password");
        setIsLoading(false);
      })
      .catch((err: ApiError) => {
        const errors = err?.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach((error) => {
            showErrorToast(error.message);
          });
        } else {
          showErrorToast("Erro ao enviar código");
        }
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
