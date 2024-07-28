import { HttpErrorResponseInterface, HttpResponseInterface } from "@core";

export interface AuthRepository<T, I> {
  signIn(data: T): Promise<HttpResponseInterface<I>>;
  signOut(data: T): Promise<I | HttpErrorResponseInterface>;
  signUp(data: T): Promise<I | HttpErrorResponseInterface>;
}
