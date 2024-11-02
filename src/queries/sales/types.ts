export type CreateSellPayload = {
  employeeId: string;
  companyId: string;
  totalPrice: number;
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
    phone: "1234567890";
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

export type SaveSellResponse = CreateSellResponse;

export interface SoldItem {
  id: string;
  saleId: string;
  productId: string;
  qtd: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  userName: string;
  email: string;
}

export interface SellPayload {
  soldItems: SoldItem[];
  employee: Employee;
  totalPrice: number;
  discount: number;
  companyId: string;
  id: string;
}
