import CreateCompanyMapper from "@/queries/company/mappers/CompanyMapper";
import CreateCompanyAdminMapper from "@/queries/company/mappers/CreateCompanyAdminMapper";
import CreateCompanyInitMapper from "@/queries/company/mappers/CreateCompanyInitMapper";
import UpdateCompanyMapper from "@/queries/company/mappers/UpdateCompanyMapper";
import {
  Company,
  CreateCompanyAdmin,
  CreateCompanyInit,
  CreateCompanyResponse,
  GetCompanyResponse,
  UpdateCompany,
} from "@/queries/company/types";
import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const listCompany = async (page: number) => {
  const { data } = await api.get<GetCompanyResponse>(`/companies?page=${page}`);
  return data;
};

const getCompanyByUid = async (uid?: string) => {
  if (!uid) return undefined;
  const { data } = await api.get<Company>(`/companies/${uid}`);
  return data;
};

const createCompany = async (payload: Company) => {
  const body = CreateCompanyMapper.toPersistence(payload);
  const { data } = await api.post<CreateCompanyResponse>("/companies", body);
  return data;
};

const createCompanyInit = async (payload: CreateCompanyInit) => {
  const body = CreateCompanyInitMapper.toPersistence(payload);
  const { data } = await api.post<Company>("/companies", body);
  return data;
};

const updateCompany = async (payload: UpdateCompany) => {
  const body = UpdateCompanyMapper.toDomain(payload);
  const { id } = payload;
  const { data } = await api.put(`/companies/${id}`, body);
  return data;
};

const createCompanyAdmin = async (payload: CreateCompanyAdmin) => {
  const body = CreateCompanyAdminMapper.toDomain(payload);
  const { data } = await api.post("/company/create/admin", body);
  return data;
};

export const useListCompany = (page: number) => {
  return useQuery({
    queryKey: ["company", page],
    queryFn: () => listCompany(page),
  });
};

export const useGetCompanyByUid = (uid?: string) => {
  return useQuery({
    queryKey: ["company", uid],
    queryFn: () => getCompanyByUid(uid),
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Company) => createCompany(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-company"] });
    },
  });
};

export const useCreateCompanyInit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCompanyInit) => createCompanyInit(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-company-init"] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCompany) => updateCompany(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["update-company"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
};

export const useCreateCompanyAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCompanyAdmin) => createCompanyAdmin(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["create-company-admin"] });
    },
  });
};
