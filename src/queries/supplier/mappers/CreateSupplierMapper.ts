import { Supplier, SupplierResponse } from "../types";

class CreateSupplierMapper {
  toPersistence(domainCreateSupplier: Supplier) {
    return {
        name: domainCreateSupplier.name,
        address: domainCreateSupplier.address,
        cnpj: domainCreateSupplier.document,
        corporateReason: domainCreateSupplier.name,
        email: domainCreateSupplier.email,
        phone: domainCreateSupplier.phone,
        lastName: domainCreateSupplier.lastName,
        dateOfBirth: domainCreateSupplier.dateOfBirth,
        nationality: domainCreateSupplier.nationality,
        niche: domainCreateSupplier.niche,
        city: domainCreateSupplier.city,
        photo: domainCreateSupplier.photo,
        startContractDate: domainCreateSupplier.contract_start,
        endContractDate: domainCreateSupplier.contract_end,
    };
  }

  toDomain(persistenceCreateSupplier: SupplierResponse[]) {
    return persistenceCreateSupplier.map((supplier) => ({
        address: supplier.address,
        city: supplier.city,
        cnpj: supplier.cnpj,
        company: {
            id: supplier.company?.id,
            firstName: supplier.company?.firstName,
            lastName: supplier.company?.lastName,
            phoneNumberAdmin: supplier.company?.phoneNumberAdmin,
        },
        emailAdmin: supplier.emailAdmin,
        firstName: supplier.firstName,
        companyId: supplier.companyId,
        corporateReason: supplier.corporateReason,
        createdAt: supplier.createdAt,
        dateOfBirth: supplier.dateOfBirth,
        email: supplier.email,
        endContractDate: supplier.endContractDate,
        id: supplier.id,
        lastName: supplier.lastName,
        name: supplier.name,
        nationality: supplier.nationality,
        niche: supplier.niche,
        phone: supplier.phone,
        photo_base64: supplier.photo_base64,
        startContractDate: supplier.startContractDate,
        transactions: supplier.transactions,
        updatedAt: supplier.updatedAt,
    }));
  }
}

export default new CreateSupplierMapper();
