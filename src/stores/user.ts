import { LoginResponse } from "@/queries/account/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
  login?: LoginResponse | null;
  isPersistent: boolean;
  setLogin: (login?: LoginResponse | null) => void;
  setIsPersistent: (isPersistent: boolean) => void;
  logout: () => void;
};

const initialLoginState: LoginResponse = {
  accessToken: "",
  user: {
    id: "",
    firstName: "",
    lastName: "",
    emailAdmin: "",
    phoneNumberAdmin: "",
    nameCompany: "",
    emailCompany: "",
    phoneNumberCompany: "",
    addressCompany: "",
    terms: false,
    role: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      login: initialLoginState,
      isPersistent: false,
      setLogin: (login?: LoginResponse | null) => set({ login }),
      setIsPersistent: (isPersistent) => set({ isPersistent }),
      logout: () => set({ login: initialLoginState, isPersistent: false }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
