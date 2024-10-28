import { CreateSellPayload, CreateSellResponse } from "../types";

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
  toDomain(persistenceCreateSell: CreateSellResponse[]) {
    return persistenceCreateSell.map((sell) => ({
      id: sell.id,
      employeeId: sell.employeeId,
      userId: sell.userId,
      totalPrice: sell.totalPrice,
      discount: sell.discount,
      createdAt: sell.createdAt,
      updatedAt: sell.updatedAt,
      employee: {
        id: sell.employee.id,
        name: sell.employee.name,
        email: sell.employee.email,
        phone: sell.employee.phone,
        address: sell.employee.address,
        role: sell.employee.role,
        login: sell.employee.login,
        senha: sell.employee.senha,
        createdAt: sell.employee.createdAt,
        updatedAt: sell.employee.updatedAt,
      },
      user: {
        id: sell.user.id,
        username: sell.user.username,
        password: sell.user.password,
        role: sell.user.role,
        createdAt: sell.user.createdAt,
        updatedAt: sell.user.updatedAt,
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
