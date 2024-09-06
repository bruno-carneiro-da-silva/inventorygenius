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
  succeeded: false,
  errors: [],
  data: {
    accessToken: "",
    expiresIn: 0,
    userToken: {
      id: 0,
      uId: 0,
      firstName: "",
      lastName: "",
      email: "",
      claims: [],
    },
    refreshToken: "",
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
