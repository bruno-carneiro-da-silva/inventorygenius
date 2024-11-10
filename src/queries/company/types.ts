import { GetSales } from "../sales/types";

export type GetCompany = {
  succeeded: boolean;
  errors: {
    key: string;
    message: string;
  }[];
  data: CompanyDetails;
};

export interface CompanyDetails {
  id: number;
  uId: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  address: string;
  ownerId: number;
  timeZoneId: number;
  companyCustomers: string;
  campaigns: string;
  companyTemplates: string;
  companyTimeZone: {
    id: number;
    nameTimeZone: string;
    currentUtcOffSet: number;
    companies: string[];
  };
  createDate: string;
  modifiedDate: string;
}

export type Company = {
  id: string;
  firstName: string;
  lastName: string;
  emailAdmin: string;
  phoneNumberAdmin: string;
  nameCompany: string;
  emailCompany: string;
  phoneNumberCompany: string;
  addressCompany: string;
  terms: false;
  role: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  planId: null;
  photo_base64: string;
  _count: {
    contacts: number;
    suppliers: number;
  };
};

export type CreateCompanyResponse = {
  id?: string;
  firstName: string;
  lastName: string;
  emailAdmin: string;
  phoneNumberAdmin: string;
  nameCompany: string;
  emailCompany: string;
  phoneNumberCompany: string;
  addressCompany: string;
  terms: boolean;
  refreshToken: string | null;
  verificationCode: string | null;
  verificationCodeExpiresAt: null;
  createdAt: string;
  updatedAt: string;
  planId: string | null;
  roleId: number;
};
export type CreateCompanyInit = {
  firstName: string;
  lastName: string;
  emailAdmin: string;
  phoneNumberAdmin: string;
  password: string;
  nameCompany: string;
  emailCompany: string;
  phoneNumberCompany: string;
  addressCompany: string;
  terms?: boolean | null;
  role?: string | null;
};
export type CreateCompanyInitResponse = {
  data: {
    firstName: string;
    lastName: string;
    emailAdmin: string;
    phoneNumberAdmin: string;
    role: string;
    companyUid: string | null;
    id: number;
    name: string;
    emailCompany: string;
    phoneNumberCompany: string;
    photoUrl: string;
    address: string;
    ownerId: number;
    timeZoneId: number;
    messageType?: string;
    timestamp?: string;
  };
  errors: string | null;
  succeeded: boolean;
};

export type UpdateCompany = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  address: string;
};

export type CreateCompanyAdmin = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

//vou apagar em breve
export type RegisterData = {
  name: string;
  mail: string;
  phone: string;
  nameCompany: string;
  companyCountry: string;
  category: string;
  addressCountry: string;
  state: string;
  city: string;
  timeZoneIdCompany: string;
};

export type GetCompanyResponse = {
  total: number;
  per_page: number;
  companyData: Company[];
  sales: GetSales[];
  totalSales: number;
};
