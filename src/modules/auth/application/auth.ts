import {
  AuthLoginInterface,
  AuthRecoverPasswordInterface,
  SessionInterface,
  IAuthRepository,
} from "@auth/domain";
import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { User } from "modules/user/domain/User";

export const authLogin = (
  user: AuthLoginInterface,
  authRepo: IAuthRepository<AuthLoginInterface, SessionInterface>,
): Promise<HttpResponseInterface<SessionInterface>> => {
  return authRepo.signIn(user);
};

export const authGetLoggedUser = (
  token: string,
  authRepo: IAuthRepository<AuthLoginInterface, SessionInterface>,
): Promise<HttpResponseInterface<User>> => {
  return authRepo.getLoggedUser(token);
};

export const authRecoverPassword = (
  email: string,
  authRepo: IAuthRepository<AuthRecoverPasswordInterface, boolean>,
): Promise<boolean> => {
  return authRepo.recoverPassword(email);
};

export const authResetPassword = (
  email: string,
  code: string,
  password: string,
  passwordConfirmation: string,
  authRepo: IAuthRepository<AuthRecoverPasswordInterface, boolean>,
) => {
  return authRepo.resetPassword(email, code, password, passwordConfirmation);
};
