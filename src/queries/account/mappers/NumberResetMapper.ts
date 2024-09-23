import { NumberResetProp, NumberResetResponse } from "@/queries/account/types";

class NumberResetMapper {
  toPersistence(domainPhoneNumber: NumberResetProp) {
    return {
      newPassword: domainPhoneNumber.newPassword,
      phoneNumberAdmin: domainPhoneNumber.phoneNumberAdmin,
      code: domainPhoneNumber.code,
    };
  }

  toDomain(persistencePhoneNumber: NumberResetResponse) {
    return {
      message: persistencePhoneNumber.message,
    };
  }
}

export default new NumberResetMapper();
