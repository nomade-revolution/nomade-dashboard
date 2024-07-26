import { HttpResponseInterface } from "@core";

export interface SignInInterface<T, I> {
  signIn(data: T): Promise<HttpResponseInterface<I>>;
}
