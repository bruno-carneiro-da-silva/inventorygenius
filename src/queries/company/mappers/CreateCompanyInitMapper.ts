import { CreateCompanyInit, GetCompany } from "@/queries/company/types";

class CreateCompanyInitMapper {
  toPersistence(domainCreateCompanyInit: CreateCompanyInit) {
    return {
      firstName: domainCreateCompanyInit.firstName,
      lastName: domainCreateCompanyInit.lastName,
      emailAdmin: domainCreateCompanyInit.emailAdmin,
      phoneNumberAdmin: domainCreateCompanyInit.phoneNumberAdmin.replace(
        /\D/g,
        ""
      ),
      password: domainCreateCompanyInit.password,
      nameCompany: domainCreateCompanyInit.nameCompany,
      emailCompany: domainCreateCompanyInit.emailCompany,
      phoneNumberCompany: domainCreateCompanyInit.phoneNumberCompany.replace(
        /\D/g,
        ""
      ),
      addressCompany: domainCreateCompanyInit.addressCompany,
    };
  }
  toDomain(persistenceCreateCompanyInit: GetCompany) {
    return {
      id: persistenceCreateCompanyInit.data.id,
      uId: persistenceCreateCompanyInit.data.uId,
      name: persistenceCreateCompanyInit.data.name,
      email: persistenceCreateCompanyInit.data.email,
      phoneNumber: persistenceCreateCompanyInit.data.phoneNumber,
      photoUrl: persistenceCreateCompanyInit.data.photoUrl,
      address: persistenceCreateCompanyInit.data.address,
      ownerId: persistenceCreateCompanyInit.data.ownerId,
      timeZoneId: persistenceCreateCompanyInit.data.timeZoneId,
      companyCustomers: persistenceCreateCompanyInit.data.companyCustomers,
      campaigns: persistenceCreateCompanyInit.data.campaigns,
      companyTemplates: persistenceCreateCompanyInit.data.companyTemplates,
      companyTimeZone: {
        id: persistenceCreateCompanyInit.data.companyTimeZone.id,
        nameTimeZone:
          persistenceCreateCompanyInit.data.companyTimeZone.nameTimeZone,
        currentUtcOffSet:
          persistenceCreateCompanyInit.data.companyTimeZone.currentUtcOffSet,
        companies: persistenceCreateCompanyInit.data.companyTimeZone.companies,
      },
      createDate: persistenceCreateCompanyInit.data.createDate,
      modifiedDate: persistenceCreateCompanyInit.data.modifiedDate,
    };
  }
}

export default new CreateCompanyInitMapper();
