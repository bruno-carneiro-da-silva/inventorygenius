import { CreateSellPayload, GetSales } from "../types";

class CreateSellMapper {
  toPersistence(domainCreateSell: CreateSellPayload) {
    return {
      employeeId: domainCreateSell.employeeId,
      companyId: domainCreateSell.companyId,
      totalPrice: Number(domainCreateSell.totalPrice),
      discount: domainCreateSell.discount,
      soldItems: domainCreateSell.soldItems.map((item) => item),
    };
  }
  toDomain(persistenceCreateSell: GetSales[]) {
    return persistenceCreateSell.map((sell) => ({
      id: sell.id,
      totalPrice: sell.totalPrice,
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
        qtd: soldItem.qtd,
        price: soldItem.price,
        createdAt: soldItem.createdAt,
        updatedAt: soldItem.updatedAt,
      })),
    }));
  }
}

export default new CreateSellMapper();
