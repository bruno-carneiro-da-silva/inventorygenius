import { Company } from "@/queries/company/types";

class CreateCompanyMapper {
  toPersistence(domainCreateCompany: Company) {
    return {
      id: domainCreateCompany.data.id,
      name: domainCreateCompany.data.name,
      email: domainCreateCompany.data.email,
      phoneNumber: domainCreateCompany.data.phoneNumber,
      photoUrl: domainCreateCompany.data.photoUrl,
      address: domainCreateCompany.data.address,
    };
  }

  toDomain(persistenceCreateCompany: Company) {
    return {
      errors: persistenceCreateCompany.errors.map((error) => ({
        key: error.key,
        message: error.message,
      })),
      succeeded: persistenceCreateCompany.succeeded,
      id: persistenceCreateCompany.data.id,
      uId: persistenceCreateCompany.data.uId,
      name: persistenceCreateCompany.data.name,
      email: persistenceCreateCompany.data.email,
      phoneNumber: persistenceCreateCompany.data.phoneNumber,
      photoUrl: persistenceCreateCompany.data.photoUrl,
      address: persistenceCreateCompany.data.address,
    };
  }
}

export default new CreateCompanyMapper();
