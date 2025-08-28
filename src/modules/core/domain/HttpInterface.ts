export interface HttpInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(url: string, params?: unknown, responseType?: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post(url: string, body?: unknown, responseType?: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch(url: string, body?: unknown, responseType?: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put(url: string, body?: unknown, responseType?: string): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(url: string, body?: unknown, responseType?: string): Promise<any>;
  setHeader(headerKey: string, headerValue: string): void;
}
