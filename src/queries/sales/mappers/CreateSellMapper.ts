import { CreateSellPayload, GetSales } from "../types";

class CreateSellMapper {
  toPersistence(domainCreateSell: CreateSellPayload) {
    return {
      employeeId: domainCreateSell.employeeId,
      companyId: domainCreateSell.companyId,
      totalPrice: Number(domainCreateSell.totalPrice),
      paymentStatus: domainCreateSell.paymentStatus,
      discount: domainCreateSell.discount,
      soldItems: domainCreateSell.soldItems.map((item) => item),
    };
  }
  toDomain(persistenceCreateSell: GetSales[]): GetSales[] {
    return persistenceCreateSell.map((sell) => ({
      id: sell.id,
      totalPrice: sell.totalPrice,
      total: sell.total,
      per_page: sell.per_page,
      totalSales: sell.totalSales,
      discount: sell.discount,
      companyId: sell.companyId,
      employee: {
        id: sell.employee.id,
        name: sell.employee.name,
        email: sell.employee.email,
        phone: sell.employee.phone,
        userName: sell.employee.userName,
      },
      soldItems: sell.soldItems.map((soldItem) => ({
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
      paymentStatus: sell.paymentStatus,
    }));
  }
}

export default new CreateSellMapper();
