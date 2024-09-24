import { Plan } from "@/types/plan";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SubscriptionState {
  selectedCycle: "Mês" | "Ano" | null;
  selectedPlan: Plan | null;
  selectedPriceId: number | null;
  setSelectedCycle: (cycle: "Mês" | "Ano") => void;
  setSelectedPlan: (plan: Plan) => void;
  setSelectedPriceId: (priceId: number | null) => void;
  getEndDate: () => string | null;
}

export const useSubscriptionStore = create(
  persist<SubscriptionState>(
    (set, get) => ({
      selectedCycle: null,
      selectedPlan: null,
      selectedPriceId: null,
      setSelectedCycle: (cycle) => set({ selectedCycle: cycle }),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setSelectedPriceId: (priceId) => set({ selectedPriceId: priceId }),
      getEndDate: () => {
        const { selectedCycle } = get();
        if (!selectedCycle) return null;
        const currentDate = new Date();
        let endDate;
        if (selectedCycle === "Mês") {
          endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        } else if (selectedCycle === "Ano") {
          endDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() + 1)
          );
        }
        return endDate ? endDate.toLocaleDateString() : null;
      },
    }),
    {
      name: "my-contact",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
