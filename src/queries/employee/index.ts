import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateEmployeeMapper from "./mappers/CreateEmployeeMapper";
import {
  CreateEmployee,
  Employee,
  EmployeeResponse,
  GetEmployeesResponse,
  UpdateEmployee
} from "./types";

const getEmployees = async (page: number, filter: string) => {
  const { data } = await api.get<GetEmployeesResponse>(
    `/employees?page=${page}&filter=${filter}`
  );
  return data;
};

const getEmployee = async (id?: string) => {
  if (!id) return undefined
  const { data } = await api.get<Employee>(`/employees/${id}`)
  return data
}

const createEmployee = async (payload: CreateEmployee) => {
  const body = CreateEmployeeMapper.toPersistence(payload);
  const { data } = await api.post<EmployeeResponse>("/employees", body);
  return data;
};

const updateEmployee = async (payload: UpdateEmployee) => {
  const body = CreateEmployeeMapper.toPersistence(payload);
  const { id } = payload;
  const { data } = await api.put<EmployeeResponse>(`/employees/${id}`, body);
  return data;
};

const deleteEmployee = async (id: string) => {
  await api.delete(`/employees/${id}`);
};

export const useGetEmployees = (page: number, filter: string) => {
  return useQuery({
    queryKey: ["employees", page, filter],
    queryFn: () => getEmployees(page, filter),
  });
};

export const useGetEmployee = (id?: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id)
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEmployee) => createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateEmployee) => updateEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
