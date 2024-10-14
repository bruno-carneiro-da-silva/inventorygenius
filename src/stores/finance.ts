import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoreState = {
  selectedMonth: string;
  selectedYear: string;
  selectedDay: string | null;
  setSelectedMonth: (month: string) => void;
  setSelectedYear: (year: string) => void;
  setSelectedDay: (day: string | null) => void;
};

export const useStore = create(
  persist<StoreState>(
    (set) => ({
      selectedMonth: "01",
      selectedYear: new Date().getFullYear().toString(),
      selectedDay: null,
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      setSelectedYear: (year) => set({ selectedYear: year }),
      setSelectedDay: (day) => set({ selectedDay: day }),
    }),
    {
      name: "finance-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
