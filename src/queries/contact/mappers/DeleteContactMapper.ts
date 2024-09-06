import { DeleteContact } from "@/queries/contact/types";
class DeleteContactMapper {
  toPersistence(contactDomain: DeleteContact) {
    return {
      companyUid: contactDomain.companyUid,
      customerUid: contactDomain.customerUid,
    };
  }
}

export default new DeleteContactMapper();
