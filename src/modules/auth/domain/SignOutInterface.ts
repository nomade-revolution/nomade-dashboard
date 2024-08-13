import { HttpErrorResponseInterface } from "@core";

export interface SignOutInterface<T, I> {
  signOut(data: T): Promise<I | HttpErrorResponseInterface>;
}
