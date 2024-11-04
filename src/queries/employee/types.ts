export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId?: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  transactions: [];
  sales: [];
};

export interface GetEmployeesResponse {
  employees: Employee[]
  per_page: number
  total: number
}

export type CreateEmployee = Omit<
  EmployeeResponse,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateEmployee = Omit<EmployeeResponse, "createdAt" | "updatedAt">;

export type EmployeeResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  roleId: string;
  password?: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};
