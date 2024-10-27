import CreateSupplierMapper from "@/queries/supplier/mappers/CreateSupplierMapper";
import api from "@/services/api";
import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import { DeleteSuppliesResponse, EditSupplierPayload, GetSuppliersResponse, SaveSupplierResponse, Supplier, SupplierDetailResponse } from "./types";

const getSuppliers = async (page: number, filter: string) => {
    const { data } = await api.get<GetSuppliersResponse>(`/suppliers?page=${page}&filter=${filter}`);
    return { ...data, suppliers: CreateSupplierMapper.toDomain(data.suppliers) };
};

const getSupplierDetail = async (id?: string) => {
    if (!id) return undefined
    const { data } = await api.get<SupplierDetailResponse>(`/suppliers/${id}`)
    return data
}

const createSupplier = async (payload: Supplier) => {
    const body = CreateSupplierMapper.toPersistence(payload);
    const { data } = await api.post<SaveSupplierResponse>(
        "/suppliers",
        body
    );
    return data;
};

const updateSupplier = async ({ id, ...payload }: EditSupplierPayload) => {
    const body = CreateSupplierMapper.toPersistence(payload);
    const { data } = await api.put<SaveSupplierResponse>(
        `/suppliers/${id}`,
        body
    );
    return data;
};

const deleteSupplier = async (id: string) => {
    const { data } = await api.delete<DeleteSuppliesResponse>(`/suppliers/${id}`);
    return data;
};

export const useGetSuppliers = (page: number, filter: string) => {
    return useQuery({
        queryKey: ["suppliers", page, filter],
        queryFn: () => getSuppliers(page, filter),
    });
};

export const useGetSupplierDetail = (id?: string) => {
    return useQuery({
        queryKey: ["supplier-detail"],
        queryFn: () => getSupplierDetail(id)
    })
}

export const useCreateSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Supplier) => createSupplier(payload),
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ["create-supplier"] });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
};

export const useUpdateSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: EditSupplierPayload) => updateSupplier(payload),
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ["create-supplier"] });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            queryClient.invalidateQueries({ queryKey: ["supplier-detail"] });
        },
    });
}

export const useDeleteSupplier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteSupplier(id),
        onMutate: () => {
            queryClient.invalidateQueries({ queryKey: ["delete-supplier"] });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
};
