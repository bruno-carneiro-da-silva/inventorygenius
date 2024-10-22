export interface ProductResponse {
  id: string;
  name: string;
  qtd: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  stock: {
    id: string;
    productId: string;
    capacity: number;
    qtd: number;
    minStock: number;
    createdAt: string;
    updatedAt: string;
  };
  soldItems: [];
  transactions: [];
}

export interface ProductInit {
  id?: string | null;
  name: string;
  qtd: number;
  price: number;
  description: string;
  photos: string;
  size: string;
  categoryId: string;
  minStock: number;
  capacity: number;
}

export interface ProductCreateResponse {
  id?: string;
  name: string;
  qtd: number;
  price: number;
  description: string;
  photos: string;
  size: string;
  categoryId: string;
  minStock: number;
  capacity: number;
}
