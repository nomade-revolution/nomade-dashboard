export type HttpErrorResponseInterface = {
  success: boolean;
  message: string;
  status?: number;
  error?: never[];
  error_code?: string;
};
