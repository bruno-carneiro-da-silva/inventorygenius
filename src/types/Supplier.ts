export type CardSupplierProps = {
  id: string;
  children?: React.ReactNode;
  url: string;
  name: string;
  product: string;
  icon: React.ReactNode;
  secondIcon: React.ReactNode;
  email?: string;
  description?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  status?: string;
  companyName?: string;
  category?: string;
  productCategory?: string;
  createdAt?: string;
  updatedAt?: string;
};

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
    items: CardSupplierProps[];
  };
};
