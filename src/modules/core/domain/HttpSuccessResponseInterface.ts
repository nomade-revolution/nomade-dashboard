export type HttpSuccessResponseInterface<T> = {
  success: boolean;
  data: T;
  message: string;
};
