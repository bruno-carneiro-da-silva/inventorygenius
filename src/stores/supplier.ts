import { CardSupplierProps, GetSupplier } from "@/types/Supplier";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SupplierStore = {
  supplier: GetSupplier;
  selectedSupplier: CardSupplierProps | null;
  isLoading: boolean;
  setSupplier: (page: number, suppliers: GetSupplier) => void;
  setSelectedSupplier: (selectedSupplier: CardSupplierProps) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSupplierStore = create(
  persist<SupplierStore>(
    (set) => ({
      supplier: {
        data: {
          totalRecords: 0,
          totalPages: 0,
          currentPage: 0,
          pageSize: 0,
          items: [],
        },
      },
      selectedSupplier: null,
      isLoading: false,
      totalPages: 0,
      setSupplier: (page: number, suppliers: GetSupplier) => {
        set((state) => ({
          supplier: { ...state.supplier, [page]: suppliers },
        }));
      },
      setSelectedSupplier: (selectedSupplier) => {
        set(() => ({
          selectedSupplier: selectedSupplier,
        }));
      },
      setIsLoading: (isLoading) => {
        set(() => ({
          isLoading: isLoading,
        }));
      },
    }),
    {
      name: "my-supplier-store",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
