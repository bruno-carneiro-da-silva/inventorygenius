import { showErrorToast } from "@/components/Toast";
import { useCreateCompanyInit } from "@/queries/company";
import { CreateCompanyInit } from "@/queries/company/types";
import { useCompanyStore } from "@/stores/company";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<CreateCompanyInit> = yup.object({
  firstName: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  emailAdmin: yup.string().required("E-mail é obrigatório"),
  phoneNumberAdmin: yup
    .string()
    .required("Por favor, insira seu número de telefone"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  nameCompany: yup.string().required("Nome da empresa é obrigatório"),
  emailCompany: yup.string().required("Email da empresa é obrigatório"),
  phoneNumberCompany: yup.string().required("Telefone da empresa é obrigatório"),
  addressCompany: yup.string().required("Endereço da empresa é obrigatório"),
  terms: yup.boolean().nullable(),
  role: yup.string().nullable(),
});

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const createCompany = useCreateCompanyInit();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setCompany } = useCompanyStore();

  const onSubmit = (company: CreateCompanyInit) => {
    setIsLoading(true);
    createCompany
      .mutateAsync(company)
      .then((res) => {
        setCompany(res);
        navigate("/cadastrar/confirm-account");
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error || "Ocorreu um erro";
        showErrorToast(errorMessage);
        setIsLoading(false);
      });
  };

  return {
    methods,
    onSubmit,
    isLoading,
  };
};
