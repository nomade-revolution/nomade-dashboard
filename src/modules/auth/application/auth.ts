import { AuthLoginInterface, SessionInterface } from "@auth/domain";
import { AuthRepository } from "@auth/domain/AuthRepository";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";

export const authLogin = (
  user: AuthLoginInterface,
  authRepo: AuthRepository<AuthLoginInterface, SessionInterface>,
): Promise<HttpResponseInterface<SessionInterface>> => {
  return authRepo.signIn(user);
};
