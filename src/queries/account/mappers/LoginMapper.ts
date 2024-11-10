import { LoginCredentials, LoginResponse } from "@/queries/account/types";

class LoginMapper {
  toPersistence(domainLogin: LoginCredentials) {
    return {
      phoneNumberAdmin: domainLogin.phoneNumberAdmin,
      password: domainLogin.password,
      isPersistent: domainLogin.isPersistent,
    };
  }

  toDomain(persistenceLogin: LoginResponse) {
    return {
      accessToken: persistenceLogin.accessToken,
      user: persistenceLogin.user ? {
        id: persistenceLogin.user.id,
        firstName: persistenceLogin.user.firstName,
        lastName: persistenceLogin.user.lastName,
        emailAdmin: persistenceLogin.user.emailAdmin,
        phoneNumberAdmin: persistenceLogin.user.phoneNumberAdmin,
        nameCompany: persistenceLogin.user.nameCompany,
        emailCompany: persistenceLogin.user.emailCompany,
        phoneNumberCompany: persistenceLogin.user.phoneNumberCompany,
        addressCompany: persistenceLogin.user.addressCompany,
        terms: persistenceLogin.user.terms,
        role: persistenceLogin.user.role,
        createdAt: persistenceLogin?.user?.createdAt,
        updatedAt: persistenceLogin?.user?.updatedAt,
      } : null,
    };
  }
}

export default new LoginMapper();
