import CreateCompanyMapper from "@/queries/company/mappers/CompanyMapper";
import CreateCompanyAdminMapper from "@/queries/company/mappers/CreateCompanyAdminMapper";
import CreateCompanyInitMapper from "@/queries/company/mappers/CreateCompanyInitMapper";
import UpdateCompanyLogoMapper from "@/queries/company/mappers/UpdateCompanyLogoMapper";
import UpdateCompanyMapper from "@/queries/company/mappers/UpdateCompanyMapper";
import {
  Company,
  CreateCompanyAdmin,
  CreateCompanyInit,
  CreateCompanyInitResponse,
  CreateCompanyResponse,
  UpdateCompany,
  UpdateCompanyLogo,
} from "@/queries/company/types";
import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const listCompany = async () => {
  const { data } = await api.get<Company>("/company");
  return data;
};

const getCompanyByUid = async (uid: string) => {
  const { data } = await api.get<Company>(`/company/${uid}`);
  return data;
};

const createCompany = async (payload: Company) => {
  const body = CreateCompanyMapper.toDomain(payload);
  const { data } = await api.post<CreateCompanyResponse>("/companies", body);
  return data;
};

const createCompanyInit = async (payload: CreateCompanyInit) => {
  const body = CreateCompanyInitMapper.toPersistence(payload);
  const { data } = await api.post<CreateCompanyInitResponse>(
    "/companies",
    body
  );
  return data;
};

const updateCompany = async (payload: UpdateCompany) => {
  const body = UpdateCompanyMapper.toDomain(payload);
  const { data } = await api.put("/company/update", body);
  return data;
};

const updateCompanyLogo = async (payload: UpdateCompanyLogo) => {
  const body = UpdateCompanyLogoMapper.toDomain(payload);
  const { data } = await api.put("/company/update/logo", body);
  return data;
};

const createCompanyAdmin = async (payload: CreateCompanyAdmin) => {
  const body = CreateCompanyAdminMapper.toDomain(payload);
  const { data } = await api.post("/company/create/admin", body);
  return data;
};

export const useListCompany = () => {
  return useQuery({
    queryKey: ["company"],
    queryFn: listCompany,
  });
};

export const useGetCompanyByUid = (uid: string) => {
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
  });
};

export const useUpdateCompanyLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCompanyLogo) => updateCompanyLogo(payload),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["update-company-logo"] });
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
