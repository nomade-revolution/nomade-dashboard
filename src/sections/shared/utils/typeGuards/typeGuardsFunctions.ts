import { HttpResponseInterface, HttpSuccessResponseInterface } from "@core";

export const isHttpSuccessResponse = <T>(
  response: HttpResponseInterface<T>,
): response is HttpSuccessResponseInterface<T> => {
  // DEV-only debug logging
  const isDev = import.meta.env.MODE !== "production";
  if (isDev) {
    // Debug logging removed for production
  }

  return (
    (response as HttpSuccessResponseInterface<T>).data !== undefined &&
    (response as { success?: boolean })?.success === true
  );
};
