import { LoginCredentials, LoginResponse } from "@/queries/account/types";

class LoginMapper {
  toPersistence(domainLogin: LoginCredentials) {
    return {
      username: domainLogin.username,
      password: domainLogin.password,
      isPersistent: domainLogin.isPersistent,
    };
  }

  toDomain(persistenceLogin: LoginResponse) {
    return {
      accessToken: persistenceLogin.accessToken,
    };
  }
}

export default new LoginMapper();
