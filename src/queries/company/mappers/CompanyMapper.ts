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

  toDomain(persistenceCreateCompany: Company[]) {
    return persistenceCreateCompany.map(company => ({
      firstName: company.firstName,
      lastName: company.lastName,
      emailAdmin: company.emailAdmin,
      phoneNumberAdmin: company.phoneNumberAdmin.replace(/\D/g, ""),
      nameCompany: company.nameCompany,
      emailCompany: company.emailCompany,
      phoneNumberCompany: company.phoneNumberCompany.replace(/\D/g, ""),
      addressCompany: company.addressCompany,
      terms: company.terms,
      role: company.role,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      planId: company.planId,
      _count: company._count,
    }));
  }
}

export default new CreateCompanyMapper();
