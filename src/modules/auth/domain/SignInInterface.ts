import { HttpResponseType } from "@core";

export interface SignInInterface<T, I> {
  signIn(data: T): Promise<HttpResponseType<I>>;
}
