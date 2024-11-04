import { GetContact } from "@/queries/contact/types";
import { Contact } from "@/types/contact";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MyContactStore = {
  contactStore: GetContact;
  selectedContact: Contact | null;
  isLoading: boolean;
  setContacts: (page: number, contacts: GetContact) => void;
  setSelectedContact: (selectedContact: Contact) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useMyContactStore = create(
  persist<MyContactStore>(
    (set) => ({
      contactStore: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        categoryId: "",
        companyId: "",
        createdAt: "",
        updatedAt: "",
      },
      selectedContact: null,
      isLoading: false,
      setContacts: (page: number, contacts: GetContact) => {
        set((state) => ({
          contactStore: { ...state.contactStore, [page]: contacts },
        }));
      },
      setSelectedContact: (selectedContact: Contact) => {
        set(() => ({
          selectedContact: selectedContact,
        }));
      },
      setIsLoading: (isLoading) => {
        set(() => ({
          isLoading: isLoading,
        }));
      },
    }),
    {
      name: "my-contact",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
