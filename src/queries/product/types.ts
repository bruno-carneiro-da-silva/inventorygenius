export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  size: string;
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
  soldItems: {
    id: string;
    saleId: string;
    productId: string;
    qtd: number;
    price: number;
    createdAt: string;
    updatedAt: string;
  }[];
  transactions: never[];
  photos: [
    {
      id: string;
      base64: string;
      productId: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export interface GetProductsResponse {
  products: ProductResponse[]
  total: number
  per_page: number
}

export interface ProductInit {
  id?: string | null;
  name: string;
  // qtd: number;
  // size: string;
  price: number;
  description: string;
  photos: string[];
  categoryId: string;
  minStock: number;
  capacity: number;
}

export interface ProductCreateResponse {
  id: string;
  name: string;
  description: string;
  size: string;
  qtd: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  photos: [
    {
      id: string;
      url: string;
      productId: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
}
