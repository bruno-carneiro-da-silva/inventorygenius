import { UpdateSellPayload } from "../types";

class EditSellMapper {
  toPersistence(domainCreateSell: UpdateSellPayload) {
    return {
      employeeId: domainCreateSell.employeeId,
      companyId: domainCreateSell.companyId,
      totalPrice: Number(domainCreateSell.totalPrice),
      paymentStatus: domainCreateSell.paymentStatus,
      discount: domainCreateSell.discount,
      soldItems: domainCreateSell.soldItems.map((item) => item),
    };
  }
}

export default new EditSellMapper();
