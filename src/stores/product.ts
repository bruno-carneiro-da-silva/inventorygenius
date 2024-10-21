import { ProductResponse } from "@/queries/product/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProductStore = {
  product: ProductResponse;
  selectedProduct: (product: ProductResponse) => void;
};

const initialProductState: ProductResponse = {
  id: "",
  name: "",
  qtd: 0,
  price: 0,
  categoryId: "",
  createdAt: "",
  updatedAt: "",
  category: {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  },
  stock: {
    id: "",
    productId: "",
    capacity: 0,
    qtd: 0,
    minStock: 0,
    createdAt: "",
    updatedAt: "",
  },
  soldItems: [],
  transactions: [],
};

export const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      product: initialProductState,
      selectedProduct: (product: ProductResponse) => set({ product }),
    }),
    {
      name: "product",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
