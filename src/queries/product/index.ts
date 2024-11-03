import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { GetProductsResponse, ProductCreateResponse, ProductInit, ProductResponse } from "./types";
import CreateProductMapper from "./mappers/CreateProductMapper";

export const getProducts = async (page: number, filter: string) => {
  const { data } = await api.get<GetProductsResponse>(
    `/products?page=${page}&filter=${filter}`
  );
  return { ...data, products: CreateProductMapper.toDomain(data.products) }
};

export const getProduct = async (id?: string) => {
  if (!id) return undefined
  const { data } = await api.get<ProductResponse>(`/products/${id}`)
  return data
}

export const createProduct = async (payload: ProductInit) => {
  const body = CreateProductMapper.toPersistence(payload);
  const { data } = await api.post<ProductCreateResponse>(`/products`, body);
  return data;
};

export const updateProduct = async (payload: ProductInit) => {
  const body = CreateProductMapper.toPersistence(payload);
  const { id } = payload;
  const { data } = await api.put<ProductCreateResponse>(
    `/products/${id}`,
    body
  );
  return data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};

export const useGetProducts = (page: number, filter: string) => {
  return useQuery({
    queryKey: ["product", page, filter],
    queryFn: () => getProducts(page, filter),
  });
};

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProduct(id),
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductInit) => createProduct(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-product"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductInit) => updateProduct(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["update-product"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["delete-product"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
