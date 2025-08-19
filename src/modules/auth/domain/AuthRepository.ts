import { HttpErrorResponseInterface, HttpResponseInterface } from "@core";
import { User } from "modules/user/domain/User";

export interface IAuthRepository<T, I> {
  signIn(data: T): Promise<HttpResponseInterface<I>>;
  signOut(data: T): Promise<I | HttpErrorResponseInterface>;
  signUp(data: T): Promise<I | HttpErrorResponseInterface>;
  getLoggedUser(token: string): Promise<HttpResponseInterface<User>>;
  recoverPassword(email: string): Promise<boolean>;
  resetPassword(
    email: string,
    code: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<boolean>;
  changePassword(
    password: string,
    newPassword: string,
    repeatNewPassword: string,
  ): Promise<boolean>;
}
