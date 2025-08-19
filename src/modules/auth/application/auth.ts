import {
  AuthLoginInterface,
  AuthRecoverPasswordInterface,
  SessionInterface,
} from "@auth/domain";
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

export const authRecoverPassword = (
  email: string,
  authRepo: AuthRepository<AuthRecoverPasswordInterface, boolean>,
): Promise<boolean> => {
  return authRepo.recoverPassword(email);
};

export const authResetPassword = (
  email: string,
  code: string,
  password: string,
  passwordConfirmation: string,
  authRepo: AuthRepository<AuthRecoverPasswordInterface, boolean>,
) => {
  return authRepo.resetPassword(email, code, password, passwordConfirmation);
};
