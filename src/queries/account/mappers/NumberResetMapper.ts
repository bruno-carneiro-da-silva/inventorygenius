import { NumberResetProp, NumberResetResponse } from "@/queries/account/types";

class NumberResetMapper {
  toPersistence(domainPhoneNumber: NumberResetProp) {
    return {
      newPassword: domainPhoneNumber.newPassword,
      phoneNumber: domainPhoneNumber.phoneNumber,
      token: domainPhoneNumber.token,
    };
  }

  toDomain(persistencePhoneNumber: NumberResetResponse) {
    return {
      id: persistencePhoneNumber.data.id,
      newPassword: persistencePhoneNumber.data.newPassword,
      phoneNumber: persistencePhoneNumber.data.phoneNumber,
      token: persistencePhoneNumber.data.token,
      user: persistencePhoneNumber.data.user,
    };
  }
}

export default new NumberResetMapper();
