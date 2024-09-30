import { Product } from "@/types/sales";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SalesStore = {
  sell: Product;
  selectedSell: Product | null;
  isLoading: boolean;
  setSell: (page: number, sell: Product) => void;
  setSelectedSell: (selectedSell: Product) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSalesStore = create(
  persist<SalesStore>(
    (set) => ({
      sell: {
        id: "",
        photo: "",
        name: "",
        price: 0,
        tag: "",
        quantity: 0,
        total: 0,
        rating: 0,
        interesting: 0,
        circlePercentage: 0,
        material: [],
        caracteristic: "",
        description: "",
      },
      selectedSell: null,
      isLoading: false,
      totalPages: 0,
      setSell: (page: number, sell: Product) => {
        set((state) => ({
          sell: { ...state.sell, [page]: sell },
        }));
      },
      setSelectedSell: (selectedSell) => {
        set(() => ({
          selectedSell: selectedSell,
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
