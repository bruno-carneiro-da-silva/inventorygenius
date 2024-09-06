export interface LoginData {
  accessToken: string;
  expiresIn: number;
  userToken: {
    id: number;
    uId: number;
    firstName: string;
    lastName: string;
    email: string;
    claims: {
      type: string;
      value: string;
    }[];
  };
  refreshToken: string;
}

export type LoginResponse = {
  succeeded: boolean;
  errors: {
    key: string;
    message: string;
  }[];
  data: LoginData;
};
export interface LoginCredentials {
  phoneNumber: string;
  password: string;
  isPersistent: boolean;
}

export type RefreshToken = Pick<LoginData, "refreshToken">;

export type VerificateCode = {
  phoneNumber: string;
  code: string;
};

export type PasswordResetProp = Pick<NumberResetProp, "newPassword"> & {
  currentPassword: string;
};

export type PhoneRecoveryProps = {
  phoneNumber: string;
};

export type UserDetails = {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type ForgotPasswordData = {
  phoneNumber: string;
  token: string;
  messageType: string;
  timestamp: string;
};

export type ForgotPasswordResponse = {
  succeeded: boolean;
  errors: string[] | null;
  data: ForgotPasswordData;
};

export type NumberResetProp = {
  newPassword: string;
  phoneNumber: string;
  token: string;
};

export type NumberResetData = {
  id?: number;
  newPassword: string;
  phoneNumber: string;
  token: string;
  user: string;
  messageType: string;
  timestamp: string;
};

export type NumberResetResponse = {
  succeeded: boolean;
  errors: string[] | null;
  data: NumberResetData;
};

export type ICreateCustomerAccount = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  address: string;
  latitude: number;
  longitude: number;
  zipCode: string;
};
