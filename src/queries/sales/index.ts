import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateSellPayload,
  CreateSellResponse,
  GetSalesResponse,
  SaveSellResponse,
} from "./types";
import CreateSellMapper from "./mappers/CreateSellMapper";

const getSales = async (page: number, filter: string) => {
  const { data } = await api.get<GetSalesResponse>(
    `/sales?page=${page}&filter=${filter}`
  );
  return { ...data, sales: CreateSellMapper.toDomain(data.sales) };
};

const createSell = async (payload: CreateSellPayload) => {
  const body = CreateSellMapper.toPersistence(payload);
  const { data } = await api.post<CreateSellResponse>("/sales", body);
  return data;
};

const updateSell = async (id: string) => {
  const { data } = await api.put<SaveSellResponse>(`/sales/${id}`);
  return data;
};

const deleteSell = async (id: string) => {
  const { data } = await api.delete<{ message: string }>(`/sales/${id}`);
  return data;
};

export const useGetSells = (page: number, filter: string) => {
  return useQuery({
    queryKey: ["sales", page, filter],
    queryFn: () => getSales(page, filter),
  });
};

export const useCreateSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSellPayload) => createSell(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};

export const useUpdateSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateSell(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};
export const useDeleteSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSell(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};
