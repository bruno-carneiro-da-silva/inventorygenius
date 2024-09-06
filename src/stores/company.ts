import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Company } from "@/queries/company/types";

type CompanyStore = {
  company: Company | null;
  setCompany: (company: Company | null) => void;
};

export const useCompanyStore = create(
  persist<CompanyStore>(
    (set) => ({
      company: null,
      setCompany: (company) => {
        set(() => ({ company }));
      },
    }),
    {
      name: "my-company",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
