import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import LoginMapper from "@/queries/account/mappers/LoginMapper";
import {
  ForgotPasswordResponse,
  LoginCredentials,
  LoginResponse,
  NumberResetProp,
  NumberResetResponse,
  PasswordResetProp,
  PhoneRecoveryProps,
  // RefreshToken,
  VerificateCode,
} from "@/queries/account/types";
import NumberResetMapper from "@/queries/account/mappers/NumberResetMapper";
import ForgotPasswordMapper from "@/queries/account/mappers/ForgotPasswordMapper";

const Login = async (payload: LoginCredentials) => {
  const body = LoginMapper.toPersistence(payload);

  const { data } = await api.post<LoginResponse>(`/login`, body);
  return LoginMapper.toDomain(data);
};

// const refresh = async (refreshToken: RefreshToken) => {
//   const { data } = await api.post<LoginResponse>("/refresh-token", {
//     refreshToken,
//   });

//   return data;
// };

const generateCode = async (phoneNumber: string) => {
  const { data } = await api.post(`/account/phone-number/generate-code`, {
    phoneNumber,
  });
  return data;
};

const verificateCode = async ({ phoneNumber, code }: VerificateCode) => {
  const { data } = await api.post(`/account/phone-number/verification-code`, {
    phoneNumber,
    code,
  });
  return data;
};

const forgotPassword = async (payload: PhoneRecoveryProps) => {
  const { phoneNumber } = payload;
  const { data } = await api.post<ForgotPasswordResponse>(
    `/account/forgot-password`,
    {
      phoneNumber,
    }
  );
  return ForgotPasswordMapper.toDomain(data);
};

const phoneNumberReset = async (payload: NumberResetProp) => {
  const body = NumberResetMapper.toPersistence(payload);

  const { data } = await api.put<NumberResetResponse>(
    `/account/password/phone-number/reset`,
    body
  );
  return data;
};

const passwordReset = async (payload: PasswordResetProp) => {
  const { data } = await api.put(`/account/password/reset`, payload);
  return data;
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginCredentials) => Login(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// export const useRefreshToken = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (refreshToken: RefreshToken) => refresh(refreshToken),
//     onMutate: () => {
//       queryClient.invalidateQueries({ queryKey: ["refreshToken"] });
//     },
//   });
// };

export const useGenerateCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phoneNumber: string) => generateCode(phoneNumber),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["generateCode"] });
    },
  });
};

export const useVerificationCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (verificationData: VerificateCode) =>
      verificateCode(verificationData),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["verificationCode"] });
    },
  });
};

export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phoneNumber: PhoneRecoveryProps) =>
      forgotPassword(phoneNumber),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["forgotPassword"] });
    },
  });
};

export const usePasswordReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PasswordResetProp) => passwordReset(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["passwordReset"] });
    },
  });
};

export const usePhoneNumberReset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NumberResetProp) => phoneNumberReset(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneNumberReset"] });
    },
  });
};

export const useLogout = () => {
  return logout;
};
