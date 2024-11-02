import { CreateSellPayload, CreateSellResponse, SellPayload } from "../types";

class CreateSellMapper {
  toPersistence(domainCreateSell: CreateSellPayload) {
    return {
      employeeId: domainCreateSell.employeeId,
      companyId: domainCreateSell.companyId,
      totalPrice: domainCreateSell.totalPrice,
      discount: domainCreateSell.discount,
      soldItems: domainCreateSell.soldItems.map((item) => ({
        productId: item.productId,
        qtd: item.qtd,
        price: item.price,
      })),
    };
  }
  toDomain(persistenceCreateSell: SellPayload[]) {
    return persistenceCreateSell.map((sell) => ({
      id: sell.id,
      totalPrice: sell.totalPrice,
      discount: sell.discount,
      employee: {
        id: sell.employee.id,
        name: sell.employee.name,
        email: sell.employee.email,
        phone: sell.employee.phone,
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
