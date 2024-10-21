import { Company } from "@/queries/company/types";

class CreateCompanyMapper {
  toPersistence(domainCreateCompany: Company) {
    return {
      firstName: domainCreateCompany.data.firstName,
      lastName: domainCreateCompany.data.lastName,
      emailAdmin: domainCreateCompany.data.emailAdmin,
      phoneNumberAdmin: domainCreateCompany.data.phoneNumberAdmin,
      password: domainCreateCompany.data.password,
      nameCompany: domainCreateCompany.data.nameCompany,
      emailCompany: domainCreateCompany.data.emailCompany,
      phoneNumberCompany: domainCreateCompany.data.phoneNumberCompany,
      addressCompany: domainCreateCompany.data.addressCompany,
      role: domainCreateCompany.data.role,
    };
  }

  toDomain(persistenceCreateCompany: Company) {
    return {
      errors: persistenceCreateCompany.errors.map((error) => error),
      succeeded: persistenceCreateCompany.succeeded,
      firstName: persistenceCreateCompany.data.firstName,
      lastName: persistenceCreateCompany.data.lastName,
      emailAdmin: persistenceCreateCompany.data.emailAdmin,
      phoneNumberAdmin: persistenceCreateCompany.data.phoneNumberAdmin,
      password: persistenceCreateCompany.data.password,
      nameCompany: persistenceCreateCompany.data.nameCompany,
      emailCompany: persistenceCreateCompany.data.emailCompany,
      phoneNumberCompany: persistenceCreateCompany.data.phoneNumberCompany,
      addressCompany: persistenceCreateCompany.data.addressCompany,
      role: persistenceCreateCompany.data.role,
    };
  }
}

export default new CreateCompanyMapper();
