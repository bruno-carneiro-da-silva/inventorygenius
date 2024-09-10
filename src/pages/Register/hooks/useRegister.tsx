import { showErrorToast } from "@/components/Toast";
import { useLogin } from "@/queries/account";
import { LoginCredentials } from "@/queries/account/types";
import { useCreateCompanyInit } from "@/queries/company";
import { CreateCompanyInit } from "@/queries/company/types";
// import { useGetAllTimeZone } from "@/queries/location";
import { useUserStore } from "@/stores/user";
import { ApiError } from "@/types/ApiError";
import { setIsPersistent } from "@/utils/sessionManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
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
  terms: yup.boolean().required("You must accept the terms"),
});

export const useRegister = () => {
  const navigate = useNavigate();
  // const { queryFn } = useGetAllTimeZone();
  // const { data: timeZones } = useQuery({ queryKey: ["timezone"], queryFn });
  const [isLoading, setIsLoading] = useState(false);
  const createCompany = useCreateCompanyInit();
  const login = useLogin();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { setLogin } = useUserStore();

  // const options =
  //   timeZones?.data.map((tz) => ({
  //     label: `${tz.nameTimeZone} (UTC${tz.currentUtcOffSet >= 0 ? "+" : ""}${
  //       tz.currentUtcOffSet
  //     })`,
  //     value: tz.id.toString(),
  //   })) || [];

  const onSubmit = (company: CreateCompanyInit) => {
    setIsLoading(true);
    createCompany
      .mutateAsync(company)
      .then(() => {
        // const credentials: LoginCredentials = {
        //   // phoneNumber: company.phoneNumberAdmin,
        //   password: company.password,
        //   isPersistent: false,
        // };
        login
          .mutateAsync(credentials)
          .then((res) => {
            setLogin(res);
            setIsPersistent(credentials.isPersistent);
            navigate("/register/choose-plan");
          })
          .catch((err: ApiError) => {
            const errors = err?.response?.data?.errors;
            if (errors && Array.isArray(errors)) {
              errors.forEach((error) => {
                showErrorToast(error.message);
              });
            } else {
              showErrorToast("An unexpected error occurred.");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
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
    // options,
    onSubmit,
    isLoading,
  };
};
