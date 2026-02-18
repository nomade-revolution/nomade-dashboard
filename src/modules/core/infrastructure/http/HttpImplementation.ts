import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
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

  constructor() {
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  public async get(
    url: string,
    params?: never,
    responseType?: string,
  ): Promise<AxiosResponse> {
    try {
      const headers = await this.buildRequestHeaders();
      const response = await axios.get(url, {
        headers,
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
      const headers = await this.buildRequestHeaders();
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.post(url, body, {
        headers,
        timeout: this.REQUEST_TIMEOUT,
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

  public async patch(
    url: string,
    body?: never,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      const headers = await this.buildRequestHeaders();
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      const response = await axios.patch(url, body, {
        headers,
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
      const headers = await this.buildRequestHeaders();
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      const response = await axios.put(url, body, {
        headers,
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
      const headers = await this.buildRequestHeaders();
      const response = await axios.delete(url, {
        headers,
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

  /**
   * Build a fresh headers object for each request so Authorization is never stale or missing.
   * Uses the same cookie key as login (environments.cookies / VITE_COOKIES_USER_TOKEN).
   */
  private async buildRequestHeaders(): Promise<RawAxiosRequestHeaders> {
    const cookieKey = environments.cookies ?? "nomade_token";
    const token = await this.cookies.get(cookieKey);
    const headers: RawAxiosRequestHeaders = {
      Accept: "application/json",
    };
    if (token) {
      headers.Authorization = "Bearer " + token;
    }
    return headers;
  }
}
