import { HttpResponseInterface, HttpSuccessResponseInterface } from "@core";

export const isHttpSuccessResponse = <T>(
  response: HttpResponseInterface<T>,
): response is HttpSuccessResponseInterface<T> => {
  return (response as HttpSuccessResponseInterface<T>).data !== undefined;
};
