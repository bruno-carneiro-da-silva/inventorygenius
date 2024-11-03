import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Company } from "@/queries/company/types";

type CompanyStore = {
  company: Company | null;
  selectedCompany: Company | null;
  setCompany: (company: Company | null) => void;
  setSelectedCompany: (company: Company | null) => void;
};

export const useCompanyStore = create(
  persist<CompanyStore>(
    (set) => ({
      company: null,
      selectedCompany: null,
      setCompany: (company) => {
        set(() => ({ company }));
      },
      setSelectedCompany: (selectedCompany) => {
        set(() => ({ selectedCompany }));
      },
    }),
    {
      name: "my-company",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
