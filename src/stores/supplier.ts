import { SupplierResponse } from "@/queries/supplier/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SupplierStore = {
  selectedSupplier: SupplierResponse | null;
  setSelectedSupplier: (selectedSupplier: SupplierResponse | null) => void;
};

export const useSupplierStore = create(
  persist<SupplierStore>(
    (set) => ({
      selectedSupplier: null,
      setSelectedSupplier: (selectedSupplier) => {
        set(() => ({
          selectedSupplier: selectedSupplier,
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
