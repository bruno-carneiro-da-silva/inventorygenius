import { Company, GetCompanyResponse } from "../types";

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

  toDomain(persistenceCreateCompany: GetCompanyResponse): GetCompanyResponse {
    return {
      total: persistenceCreateCompany.total,
      per_page: persistenceCreateCompany.per_page,
      totalSales: persistenceCreateCompany.totalSales,
      companyData: {
        id: persistenceCreateCompany.companyData.id,
        firstName: persistenceCreateCompany.companyData.firstName,
        lastName: persistenceCreateCompany.companyData.lastName,
        emailAdmin: persistenceCreateCompany.companyData.emailAdmin,
        phoneNumberAdmin: persistenceCreateCompany.companyData.phoneNumberAdmin,
        nameCompany: persistenceCreateCompany.companyData.nameCompany,
        emailCompany: persistenceCreateCompany.companyData.emailCompany,
        phoneNumberCompany:
          persistenceCreateCompany.companyData.phoneNumberCompany,
        addressCompany: persistenceCreateCompany.companyData.addressCompany,
        terms: persistenceCreateCompany.companyData.terms,
        role: persistenceCreateCompany.companyData.role,
        createdAt: persistenceCreateCompany.companyData?.createdAt,
        updatedAt: persistenceCreateCompany.companyData?.updatedAt,
        planId: persistenceCreateCompany.companyData.planId,
        photo_base64: persistenceCreateCompany.companyData.photo_base64,
        _count: {
          suppliers: persistenceCreateCompany.companyData._count.suppliers,
          contacts: persistenceCreateCompany.companyData._count.contacts,
        },
      },
      sales: persistenceCreateCompany.sales.map((sale) => ({
        id: sale.id,
        totalPrice: sale.totalPrice,
        total: sale.total,
        per_page: sale.per_page,
        discount: sale.discount,
        companyId: sale.companyId,
        paymentStatus: sale.paymentStatus,
        employee: {
          id: sale.employee.id,
          name: sale.employee.name,
          email: sale.employee.email,
          phone: sale.employee.phone,
          userName: sale.employee.userName,
        },
        soldItems: sale.soldItems.map((soldItem) => ({
          id: soldItem.id,
          saleId: soldItem.saleId,
          productId: soldItem.productId,
          product: {
            name: soldItem.product.name,
            description: soldItem.product.description,
            photos: soldItem.product.photos.map((photo) => ({
              id: photo.id,
              base64: photo.base64,
              productId: photo.productId,
            })),
            createdAt: soldItem.product?.createdAt,
            updatedAt: soldItem.product?.updatedAt,
            category: {
              id: soldItem.product.category.id,
              name: soldItem.product.category.name,
            },
          },
          qtd: soldItem.qtd,
          price: soldItem.price,
          createdAt: soldItem?.createdAt,
          updatedAt: soldItem?.updatedAt,
        })),
      })),
    };
  }
}

export default new CreateCompanyMapper();
