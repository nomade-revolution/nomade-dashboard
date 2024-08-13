import { AuthLoginInterface, SessionInterface } from "@auth/domain";
import { AuthRepository } from "@auth/domain/AuthRepository";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { User } from "modules/user/domain/User";

export const authLogin = (
  user: AuthLoginInterface,
  authRepo: AuthRepository<AuthLoginInterface, SessionInterface>,
): Promise<HttpResponseInterface<SessionInterface>> => {
  return authRepo.signIn(user);
};

export const authGetLoggedUser = (
  token: string,
  authRepo: AuthRepository<AuthLoginInterface, SessionInterface>,
): Promise<HttpResponseInterface<User>> => {
  return authRepo.getLoggedUser(token);
};
