import { GetSales } from "@/queries/sales/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SalesStore = {
  sell: GetSales;
  selectedSell: GetSales | null;
  isLoading: boolean;
  setSell: (page: number, sell: GetSales) => void;
  setSelectedSell: (selectedSell: GetSales) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSalesStore = create(
  persist<SalesStore>(
    (set) => ({
      sell: {
        soldItems: [],
        employee: {
          id: "",
          name: "",
          phone: "",
          userName: "",
          email: "",
          total: 0,
          per_page: 0,
        },
        totalSales: 0,
        totalPrice: 0,
        discount: 0,
        paymentStatus: "PENDING",
        companyId: "",
        id: "",
        total: 0,
        per_page: 0,
      },
      selectedSell: null,
      isLoading: false,
      setSell: () => {
        set((state) => ({
          sell: { ...state.sell, soldItems: [...state.sell.soldItems] },
        }));
      },
      setSelectedSell: (selectedSell) => {
        set((state) => ({
          selectedSell: { ...state.sell, ...selectedSell },
        }));
      },
      setIsLoading: (isLoading) => {
        set(() => ({
          isLoading: isLoading,
        }));
      },
    }),
    {
      name: "my-sales-store",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
