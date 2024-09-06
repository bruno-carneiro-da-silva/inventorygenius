import { LoginCredentials, LoginResponse } from "@/queries/account/types";

class LoginMapper {
  toPersistence(domainLogin: LoginCredentials) {
    return {
      phoneNumber: domainLogin.phoneNumber.replace(/\D/g, ""),
      password: domainLogin.password,
      isPersistent: domainLogin.isPersistent,
    };
  }

  toDomain(persistenceLogin: LoginResponse) {
    return {
      succeeded: persistenceLogin.succeeded,
      errors: persistenceLogin.errors
        ? persistenceLogin.errors.map((error) => error)
        : [],
      data: {
        accessToken: persistenceLogin.data.accessToken,
        expiresIn: persistenceLogin.data.expiresIn,
        userToken: {
          id: persistenceLogin.data.userToken.id,
          uId: persistenceLogin.data.userToken.uId,
          firstName: persistenceLogin.data.userToken.firstName,
          lastName: persistenceLogin.data.userToken.lastName,
          email: persistenceLogin.data.userToken.email,
          claims: persistenceLogin.data.userToken.claims
            ? persistenceLogin.data.userToken.claims.map((claim) => ({
                type: claim.type,
                value: claim.value,
              }))
            : [],
        },
        refreshToken: persistenceLogin.data.refreshToken,
      },
    };
  }
}

export default new LoginMapper();
