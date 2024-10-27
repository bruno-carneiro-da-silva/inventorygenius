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
