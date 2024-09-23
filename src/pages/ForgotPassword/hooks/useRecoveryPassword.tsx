import { showErrorToast } from "@/components/Toast";
import { useForgotPassword } from "@/queries/account";
import { PasswordRecoveryProps } from "@/queries/account/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<PasswordRecoveryProps> = yup.object({
  emailAdmin: yup.string().required("Email é obrigatório"),
});

export default function useRecoveryPassword() {
  const navigate = useNavigate();
  const methods = useForm<PasswordRecoveryProps>({
    resolver: yupResolver(schema),
  });
  const recoverPassword = useForgotPassword();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (emailAdmin: PasswordRecoveryProps) => {
    setIsLoading(true);
    recoverPassword
      .mutateAsync(emailAdmin)
      .then(() => {
        navigate("/change-password");
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
