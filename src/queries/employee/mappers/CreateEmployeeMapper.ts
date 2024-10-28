import { CreateEmployee, Employee } from "../types";

class CreateEmployeeMapper {
  toPersistence(domainCreateEmployee: CreateEmployee) {
    return {
      name: domainCreateEmployee.name,
      email: domainCreateEmployee.email,
      phone: domainCreateEmployee.phone.replace(/\D/g, ""),
      address: domainCreateEmployee.address,
      roleId: domainCreateEmployee.roleId,
      userName: domainCreateEmployee.userName,
      password: domainCreateEmployee.password,
    };
  }
  toDomain(persistenceCreateEmployee: Employee[]) {
    return persistenceCreateEmployee.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      roleId: employee.roleId,
      userName: employee.userName,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      transactions: employee.transactions,
      sales: employee.sales,
    }));
  }
}

export default new CreateEmployeeMapper();
