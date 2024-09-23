export interface LoginData {
  accessToken: string;
  // expiresIn: number;
  // userToken: {
  //   id: number;
  //   uId: number;
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   claims: {
  //     type: string;
  //     value: string;
  //   }[];
  // };
}

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    emailAdmin: string;
    phoneNumberAdmin: string;
    nameCompany: string;
    emailCompany: string;
    phoneNumberCompany: string;
    addressCompany: string;
    terms: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};
export interface LoginCredentials {
  phoneNumberAdmin: string;
  password: string;
  isPersistent?: boolean;
}

// export type RefreshToken = Pick<LoginData, refreshToken">;

export type VerificateCode = {
  phoneNumber: string;
  code: string;
};

export type PasswordResetProp = Pick<NumberResetProp, "newPassword"> & {
  currentPassword: string;
};

export type PasswordRecoveryProps = {
  emailAdmin: string;
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
  message: string;
};

export type NumberResetProp = {
  newPassword: string;
  phoneNumberAdmin: string;
  code: string;
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
  message: string;
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
