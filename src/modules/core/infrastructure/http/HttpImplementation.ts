import axios, {
  AxiosHeaders,
  AxiosRequestHeaders,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { HttpInterface, HttpHeadersInterface } from "@core/domain";
import {
  AsyncCookiesImplementation,
  //AsyncStorageImplementation
} from "@core/infrastructure";
import environments from "@environments";

export type Method = "get" | "delete" | "post" | "put" | "patch";

export class HttpImplementation implements HttpInterface {
  //private readonly storage = new AsyncStorageImplementation();
  private readonly cookies = new AsyncCookiesImplementation();
  private headers: HttpHeadersInterface = {};
  private readonly REQUEST_TIMEOUT: number = 30000;
  private token?: string | null = null;

  constructor() {
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  public async get(
    url: string,
    params?: never,
    responseType?: string,
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();
      const response = await axios.get(url, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params: { ...(params as any) },
        responseType: responseType as "json",
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse;
      }
      return Promise.reject(error);
    }
  }

  public async post(
    url: string,
    body?: never,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();

      // DEV-only debug logging
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }

      const response = await axios.post(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });

      if (isDev) {
        // Debug logging removed for production
      }

      return response; // FIXED: Return full response object, not just response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const isDev = import.meta.env.MODE !== "production";
        if (isDev) {
          // Debug logging removed for production
        }
        return error.response as AxiosResponse;
      }
      return Promise.reject(error);
    }
  }

  public async patch(
    url: string,
    body?: never,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();
      const response = await axios.patch(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response; // FIXED: Return full response object, not just response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse;
      }
      return Promise.reject(error);
    }
  }

  public async put(
    url: string,
    body?: never,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();
      const response = await axios.put(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response; // FIXED: Return full response object, not just response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse;
      }
      return Promise.reject(error);
    }
  }

  public async delete(
    url: string,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();
      const response = await axios.delete(url, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response; // FIXED: Return full response object, not just response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse;
      }
      return Promise.reject(error);
    }
  }

  public setHeader(headerKey: string, headerValue: string): void {
    this.headers[headerKey] = headerValue;
  }

  private getHeaders(): AxiosRequestHeaders {
    const headers: AxiosRequestHeaders = <
      RawAxiosRequestHeaders & AxiosHeaders
    >this.headers;
    return headers;
  }

  private async buildHeaders(): Promise<void> {
    try {
      // Get token from cookies
      this.token = await this.cookies.get(environments.cookies!);

      // DEV-only debug logging
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }

      // Set Authorization header if token exists
      if (this.token) {
        this.setHeader("Authorization", "Bearer " + this.token);
        if (isDev) {
          // Debug logging removed for production
        }
      } else {
        if (isDev) {
          // Debug logging removed for production
        }
      }
    } catch (error) {
      const isDev = import.meta.env.MODE !== "production";
      if (isDev) {
        // Debug logging removed for production
      }
      return Promise.resolve();
    }
  }
}
