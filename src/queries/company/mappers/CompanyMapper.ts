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
      companyData: persistenceCreateCompany.companyData.map((company) => ({
        id: company.id,
        firstName: company.firstName,
        lastName: company.lastName,
        emailAdmin: company.emailAdmin,
        phoneNumberAdmin: company.phoneNumberAdmin,
        nameCompany: company.nameCompany,
        emailCompany: company.emailCompany,
        phoneNumberCompany: company.phoneNumberCompany,
        addressCompany: company.addressCompany,
        terms: company.terms,
        role: company.role,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        planId: company.planId,
        photo_base64: company.photo_base64,
        _count: company._count,
      })),
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
            createdAt: soldItem.product.createdAt,
            updatedAt: soldItem.product.updatedAt,
            category: {
              id: soldItem.product.category.id,
              name: soldItem.product.category.name,
            },
          },
          qtd: soldItem.qtd,
          price: soldItem.price,
          createdAt: soldItem.createdAt,
          updatedAt: soldItem.updatedAt,
        })),
      })),
    };
  }
}

export default new CreateCompanyMapper();
