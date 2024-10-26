import { Contact, GetContact } from "@/queries/contact/types";

class CreateContactMapper {
  toPersistence(domainCreateContact: Contact) {
    return {
      companyUid: domainCreateContact.companyUid,
      firstName: domainCreateContact.firstName,
      dateOfBirth: domainCreateContact.dateOfBirth,
      lastName: domainCreateContact.lastName,
      email: domainCreateContact.email,
      phoneNumber: domainCreateContact.phoneNumber,
      address: domainCreateContact.address,
      latitude: domainCreateContact.latitude,
      longitude: domainCreateContact.longitude,
      zipCode: domainCreateContact.zipCode,
    };
  }

  toDomain(persistenceCreateContact: GetContact[]) {
    return persistenceCreateContact.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      categoryId: contact.categoryId,
      companyId: contact.companyId,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
      category: {
        id: contact.category.id,
        name: contact.category.name,
        createdAt: contact.category.createdAt,
        updatedAt: contact.category.updatedAt,
      },
    }));
  }
}

export default new CreateContactMapper();
