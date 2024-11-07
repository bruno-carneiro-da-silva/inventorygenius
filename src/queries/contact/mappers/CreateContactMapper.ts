import { Contact, GetContact } from "@/queries/contact/types";

class CreateContactMapper {
  toPersistence(domainCreateContact: Contact) {
    return {
      companyId: domainCreateContact.companyUid,
      name: domainCreateContact.name,
      birthday: domainCreateContact.dateOfBirth,
      email: domainCreateContact.email,
      status: domainCreateContact.status,
      phone: domainCreateContact.phoneNumber,
      address: domainCreateContact.address,
      latitude: domainCreateContact.latitude,
      longitude: domainCreateContact.longitude,
      zip: domainCreateContact.zipCode,
    };
  }

  toDomain(persistenceCreateContact: GetContact[]) {
    return persistenceCreateContact.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      status: contact.status,
      companyId: contact.companyId,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));
  }
}

export default new CreateContactMapper();
