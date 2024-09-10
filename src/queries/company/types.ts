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
  errors: {
    key: string;
    message: string;
  }[];
  succeeded: boolean;
  data: {
    id: number;
    uId?: string;
    name: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    address: string;
  };
};

export type CreateCompanyResponse = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  address: string;
  timeZoneId: number;
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
  terms: boolean;
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
  id?: number;
  companyUid: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  address: string;
};
export type UpdateCompanyLogo = {
  id?: number;
  companyUid: string;
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
