import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CategoryDetails,
  CategoryMapperInit,
  DeleteContactResponse,
} from "./types";
import CreateCategoryMapper from "./mappers/CreateCategoryMapper";

export const listCategories = async () => {
  const { data } = await api.get<CategoryDetails[]>("/categories");
  return data;
};

export const createCategory = async (payload: CategoryMapperInit) => {
  const body = CreateCategoryMapper.toPersistence(payload);
  const { data } = await api.post<CategoryDetails>("/categories", body);
  return data;
};

export const updateCategory = async (payload: CategoryMapperInit) => {
  const body = CreateCategoryMapper.toPersistence(payload);
  const { id } = payload;
  const { data } = await api.put(`/categories/${id}`, body);
  return data;
};

const deleteCategory = async (id: string) => {
  const { data } = await api.delete<DeleteContactResponse>(`/categories/${id}`);
  return data;
};

export const useListCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryMapperInit) => createCategory(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryMapperInit) => updateCategory(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
