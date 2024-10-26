export type Contact = {
  companyUid?: string;
  firstName: string;
  dateOfBirth: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  latitude?: number;
  longitude?: number;
  zipCode: string;
};

export type CreateContactResponse = {
  succeeded: boolean;
  errors: {
    key: string;
    message: string;
  }[];
  data: ContactDetails;
};

export type GetContact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  categoryId: string;
  companyId: string | null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactDetails = {
  id: number;
  uId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  zipCode: string;
  photoUrl: string | null;
  dateOfBirth: string | null;
  companyCustomers: string | null;
  groupCustomers: string | null;
  createDate: string;
  groups: ContactGroupDetails[] | null;
  modifiedDate: string | null;
};

export type ContactGroupDetails = {
  id: number;
  uId: string;
  name: string;
  status: string;
  totalCustomer: number;
  createDate: string;
};

export type GetContactMapper = {
  succeeded?: boolean;
  errors?: {
    key: string;
    message: string;
  }[];
  data: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    items: ContactDetails[];
  };
};

export type GetFilteredContact = {
  companyUid: string;
  name: string;
  phoneNumnber: string;
  page: number;
  pageSize: number;
};

export interface DeleteContact {
  companyUid: string;
  customerUid: string;
}

export type DeleteContactResponse = {
  succeeded: boolean;
  errors: {
    key: string;
    message: string;
  }[];
  data: {
    companyUid: string;
    customerUid: string;
    messageType: string;
    timestamp: string;
  };
};
