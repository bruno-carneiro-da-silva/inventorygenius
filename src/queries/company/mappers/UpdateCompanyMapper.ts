import { UpdateCompany } from "@/queries/company/types";

class UpdateCompanyMapper {
  toPersistence(domainUpdateCompany: UpdateCompany) {
    return {
      id: domainUpdateCompany.id,
      name: domainUpdateCompany.name,
      email: domainUpdateCompany.email,
      phoneNumber: domainUpdateCompany.phoneNumber,
      photoUrl: domainUpdateCompany.photoUrl,
      address: domainUpdateCompany.address,
    };
  }
  toDomain(persistenceUpdateCompany: UpdateCompany) {
    return {
      id: persistenceUpdateCompany.id,
      name: persistenceUpdateCompany.name,
      email: persistenceUpdateCompany.email,
      phoneNumber: persistenceUpdateCompany.phoneNumber,
      photoUrl: persistenceUpdateCompany.photoUrl,
      address: persistenceUpdateCompany.address,
    };
  }
}
export default new UpdateCompanyMapper();
