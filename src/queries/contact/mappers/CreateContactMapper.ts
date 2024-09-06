import { Contact, GetContactMapper } from "@/queries/contact/types";

class CreateContactMapper {
  toPersistence(persistenceCreateContact: Contact) {
    return {
      companyUid: persistenceCreateContact.companyUid,
      firstName: persistenceCreateContact.firstName,
      dateOfBirth: new Date(persistenceCreateContact.dateOfBirth).toISOString(),
      lastName: persistenceCreateContact.lastName,
      email: persistenceCreateContact.email,
      phoneNumber: persistenceCreateContact.phoneNumber.replace(/\D/g, ""),
      address: persistenceCreateContact.address,
      latitude: persistenceCreateContact.latitude,
      longitude: persistenceCreateContact.longitude,
      zipCode: persistenceCreateContact.zipCode,
    };
  }

  toDomain(persistenceCreateContact: GetContactMapper) {
    console.log("here", persistenceCreateContact);
    return {
      succeeded: persistenceCreateContact.succeeded,
      errors: persistenceCreateContact.errors,
      data: {
        totalRecords: persistenceCreateContact.data.totalRecords,
        totalPages: persistenceCreateContact.data.totalPages,
        currentPage: persistenceCreateContact.data.currentPage,
        pageSize: persistenceCreateContact.data.pageSize,
        items: persistenceCreateContact.data.items,
      },
    };
  }
}

export default new CreateContactMapper();
