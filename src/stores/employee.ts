import { Employee } from "@/queries/employee/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type EmployeeStore = {
  employee?: Employee;
  setSelectedEmployee: (employee?: Employee) => void;
};

export const useEmployeeStore = create(
  persist<EmployeeStore>(
    (set) => ({
      employee: undefined,
      setSelectedEmployee(employee) {
        set({ employee })
      },
    }),
    {
      name: "employee",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
