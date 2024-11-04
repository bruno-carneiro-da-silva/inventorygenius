import { SupplierResponse } from "@/queries/supplier/types";

export type GetSupplier = {
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
    items: SupplierResponse[];
  };
};

export type CardSupplierProps = {
  id: string;
  name: string;
  url: string;
  product: string;
  icon: string;
  secondIcon: string;
  email: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  status: string;
  companyName: string;
  category: string;
  productCategory: string;
  createdAt: string;
  updatedAt: string;
};
