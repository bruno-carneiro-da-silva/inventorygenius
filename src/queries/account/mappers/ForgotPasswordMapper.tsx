import {
  ForgotPasswordResponse,
  PhoneRecoveryProps,
} from "@/queries/account/types";

class ForgotPasswordMapper {
  toPersistence(domainFogotPassword: PhoneRecoveryProps) {
    return {
      phoneNumber: domainFogotPassword.phoneNumber,
    };
  }

  toDomain(persistenceForgotPassword: ForgotPasswordResponse) {
    return {
      phoneNumber: persistenceForgotPassword.data.phoneNumber,
      token: persistenceForgotPassword.data.token,
    };
  }
}

export default new ForgotPasswordMapper();
