import { CreateCompanyAdmin } from "@/queries/company/types";

class CreateCompanyAdminMapper {
  toPersistence(domainCreateCompanyAdmin: CreateCompanyAdmin) {
    return {
      firstName: domainCreateCompanyAdmin.firstName,
      lastName: domainCreateCompanyAdmin.lastName,
      email: domainCreateCompanyAdmin.email,
      phoneNumber: domainCreateCompanyAdmin.phoneNumber,
      password: domainCreateCompanyAdmin.password,
    };
  }
  toDomain(persistenceCreateCompanyAdmin: CreateCompanyAdmin) {
    return {
      firstName: persistenceCreateCompanyAdmin.firstName,
      lastName: persistenceCreateCompanyAdmin.lastName,
      email: persistenceCreateCompanyAdmin.email,
      phoneNumber: persistenceCreateCompanyAdmin.phoneNumber,
      password: persistenceCreateCompanyAdmin.password,
    };
  }
}
export default new CreateCompanyAdminMapper();
