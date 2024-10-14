import { showErrorToast } from "@/components/Toast";
import { useCreateCompanyInit } from "@/queries/company";
import { CreateCompanyInit } from "@/queries/company/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<CreateCompanyInit> = yup.object({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAdmin: yup.string().required("E-mail is required"),
  phoneNumberAdmin: yup.string().required("Please write a valid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  nameCompany: yup.string().required("Digital name is required"),
  emailCompany: yup.string().required("Company e-mail is required"),
  phoneNumberCompany: yup.string().required("Company phone is required"),
  addressCompany: yup.string().required("Address is required"),
  terms: yup.boolean().nullable(),
});

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const createCompany = useCreateCompanyInit();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (company: CreateCompanyInit) => {
    console.log("teste", company);
    setIsLoading(true);
    createCompany
      .mutateAsync(company)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.errors?.[0]?.message || "An error occurred";
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
