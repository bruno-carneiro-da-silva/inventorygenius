import {
  CreateSellPayload,
  GetSales,
  UpdateSellPayload,
} from "@/queries/sales/types";
import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateSellResponse,
  UpdateSellResponse,
  GetSalesResponse,
} from "./types";
import CreateSellMapper from "./mappers/CreateSellMapper";
import EditSellMapper from "./mappers/EditSellMapper";

const getSales = async (page: number, filter: string) => {
  const { data } = await api.get<GetSalesResponse>(
    `/sales?page=${page}&filter=${filter}`
  );
  return { ...data, sales: CreateSellMapper.toDomain(data.sales) };
};

const getSale = async (id?: string) => {
  if (!id) return null;
  const { data } = await api.get<GetSales>(`/sales/${id}`);
  return data;
};

const createSell = async (payload: CreateSellPayload) => {
  const body = CreateSellMapper.toPersistence(payload);
  const { data } = await api.post<CreateSellResponse>("/sales", body);
  return data;
};

const updateSell = async (payload: UpdateSellPayload) => {
  const body = EditSellMapper.toPersistence(payload);
  const { id } = payload;
  const { data } = await api.put<UpdateSellResponse>(`/sales/${id}`, body);
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

export const useGetSale = (id?: string) => {
  return useQuery({
    queryKey: ["sale-detail", id],
    queryFn: () => getSale(id),
  });
};

export const useCreateSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSellPayload) => createSell(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-sell"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};

export const useUpdateSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateSellPayload) => updateSell(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["update-sell"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};
export const useDeleteSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSell(id),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["delete-sell"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};
