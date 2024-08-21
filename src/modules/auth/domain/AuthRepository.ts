import { HttpErrorResponseInterface, HttpResponseInterface } from "@core";
import { User } from "modules/user/domain/User";

export interface AuthRepository<T, I> {
  signIn(data: T): Promise<HttpResponseInterface<I>>;
  signOut(data: T): Promise<I | HttpErrorResponseInterface>;
  signUp(data: T): Promise<I | HttpErrorResponseInterface>;
  getLoggedUser(token: string): Promise<HttpResponseInterface<User>>;
  recoverPassword(email: string): Promise<boolean>;
}
