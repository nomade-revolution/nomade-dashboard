import {
  HttpErrorResponseInterface,
  HttpSuccessResponseInterface,
} from "@core/domain/index.ts";

export type HttpResponseInterface<T> =
  | HttpSuccessResponseInterface<T>
  | HttpErrorResponseInterface;
