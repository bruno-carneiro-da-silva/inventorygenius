import { create } from "zustand";
import { persist } from "zustand/middleware";
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
        if (company) {
          const { photo_base64, ...rest } = company
          set(() => ({ company: { ...rest, photo_base64: '' } }));
        } else {
          set({ company: null })
        }
      },
      setSelectedCompany: (selectedCompany) => {
        set(() => ({ selectedCompany }));
      },
    }),
    {
      name: "my-company",
      version: 1,
    }
  )
);
