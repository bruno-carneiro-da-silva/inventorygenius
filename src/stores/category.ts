import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CategoryDetails } from "@/queries/category/types";

type CategoryStore = {
  categories: CategoryDetails[] | null;
  selectedCategory: CategoryDetails | null;
  setCategories: (categories: CategoryDetails[] | null) => void;
  selectCategory: (categoryId: string) => void;
};

export const useCategoryStore = create(
  persist<CategoryStore>(
    (set) => ({
      categories: null,
      selectedCategory: null,
      setCategories: (categories: CategoryDetails[] | null) => {
        set(() => ({ categories }));
      },
      selectCategory: (categoryId: string) => {
        set((state) => ({
          selectedCategory:
            state.categories?.find((category) => category.id === categoryId) ||
            null,
        }));
      },
    }),
    {
      name: "categories",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
