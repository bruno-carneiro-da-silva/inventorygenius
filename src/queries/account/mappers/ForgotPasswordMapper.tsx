import {
  ForgotPasswordResponse,
  PasswordRecoveryProps,
} from "@/queries/account/types";

class ForgotPasswordMapper {
  toPersistence(domainFogotPassword: PasswordRecoveryProps) {
    return {
      emailAdmin: domainFogotPassword.emailAdmin,
    };
  }

  toDomain(persistenceForgotPassword: ForgotPasswordResponse) {
    return {
      message: persistenceForgotPassword.message,
    };
  }
}

export default new ForgotPasswordMapper();
