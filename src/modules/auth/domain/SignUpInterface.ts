import { HttpErrorResponseInterface } from "@core/domain";

export interface SignUpInterface<T, I> {
  signUp(data: T): Promise<I | HttpErrorResponseInterface>;
}
