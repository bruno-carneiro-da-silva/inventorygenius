import { UpdateCompanyLogo } from "@/queries/company/types";

class UpdateCompanyLogoMapper {
  toPersistence(domainUpdateCompanyLogo: UpdateCompanyLogo) {
    return {
      companyUid: domainUpdateCompanyLogo.companyUid,
    };
  }
  toDomain(persistenceUpdateCompanyLogo: UpdateCompanyLogo) {
    return {
      companyUid: persistenceUpdateCompanyLogo.companyUid,
    };
  }
}
export default new UpdateCompanyLogoMapper();
