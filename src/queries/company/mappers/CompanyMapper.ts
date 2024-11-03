import { Company } from "@/queries/company/types";

class CreateCompanyMapper {
  toPersistence(domainCreateCompany: Company) {
    return {
      firstName: domainCreateCompany.firstName,
      lastName: domainCreateCompany.lastName,
      emailAdmin: domainCreateCompany.emailAdmin,
      phoneNumberAdmin: domainCreateCompany.phoneNumberAdmin.replace(/\D/g, ""),
      nameCompany: domainCreateCompany.nameCompany,
      emailCompany: domainCreateCompany.emailCompany,
      phoneNumberCompany: domainCreateCompany.phoneNumberCompany.replace(
        /\D/g,
        ""
      ),
      addressCompany: domainCreateCompany.addressCompany,
    };
  }

  toDomain(persistenceCreateCompany: Company) {
    return {
      id: persistenceCreateCompany.id,
      firstName: persistenceCreateCompany.firstName,
      lastName: persistenceCreateCompany.lastName,
      emailAdmin: persistenceCreateCompany.emailAdmin,
      phoneNumberAdmin: persistenceCreateCompany.phoneNumberAdmin.replace(
        /\D/g,
        ""
      ),
      nameCompany: persistenceCreateCompany.nameCompany,
      emailCompany: persistenceCreateCompany.emailCompany,
      phoneNumberCompany: persistenceCreateCompany.phoneNumberCompany.replace(
        /\D/g,
        ""
      ),
      addressCompany: persistenceCreateCompany.addressCompany,
      terms: persistenceCreateCompany.terms,
      role: persistenceCreateCompany.role,
      createdAt: persistenceCreateCompany.createdAt,
      updatedAt: persistenceCreateCompany.updatedAt,
      planId: persistenceCreateCompany.planId,
      photo_base64: persistenceCreateCompany.photo_base64,
      _count: persistenceCreateCompany._count,
    };
  }
}

export default new CreateCompanyMapper();
