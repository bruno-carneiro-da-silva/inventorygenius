export type CreateSellPayload = {
  id?: string | null;
  employeeId: string;
  companyId: string;
  totalPrice: string;
  paymentStatus: "PENDING" | "PAID" | "CANCELED" | "REFUSED";
  discount?: number | null;
  soldItems: {
    productId: string;
    qtd: number;
    price: number;
  }[];
};

export type UpdateSellPayload = {
  id: string;
  employeeId: string;
  companyId: string;
  totalPrice: string;
  paymentStatus: string;
  discount: number;
  soldItems: {
    productId: string;
    qtd: number;
    price: number;
  }[];
};

export type CreateSellResponse = {
  id: string;
  employeeId: string;
  userId: string;
  totalPrice: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  employee: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    login: string;
    senha: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    username: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  soldItems: [
    {
      id: string;
      saleId: string;
      productId: string;
      qtd: number;
      price: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
};

export type UpdateSellResponse = CreateSellResponse;

export interface SoldItem {
  id: string;
  saleId: string;
  productId: string;
  rating?: number;
  qtd: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: {
    [x: string]: any;
    createdAt: any;
    updatedAt: any;
    name: string;
    description: string;
    photos: {
      id: string;
      base64: string;
      productId: string;
      createdAt?: string;
      updatedAt?: string;
    }[];
    category: {
      id: any;
      name: string;
    };
  };
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  userName: string;
  email: string;
}

export interface GetSales {
  soldItems: SoldItem[];
  employee: Employee;
  totalPrice: number;
  discount: number;
  paymentStatus: "PENDING" | "PAID" | "CANCELED" | "REFUSED";
  companyId: string;
  id: string;
  total: number;
  per_page: number;
  totalSales: number;
}

export interface GetSalesResponse {
  sales: GetSales[];
  total: number;
  per_page: number;
}
