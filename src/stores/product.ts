import { ProductResponse } from "@/queries/product/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProductStore = {
  product?: ProductResponse;
  selectedProduct: (product?: ProductResponse) => void;
};

export const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      product: undefined,
      selectedProduct: (product) => set({ product }),
    }),
    {
      name: "product",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
