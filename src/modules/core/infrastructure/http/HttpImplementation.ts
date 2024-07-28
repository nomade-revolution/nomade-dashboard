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

export type Method = "get" | "delete" | "post" | "put" | "patch";

export class HttpImplementation implements HttpInterface {
  //private readonly storage = new AsyncStorageImplementation();
  private readonly cookies = new AsyncCookiesImplementation();
  private headers: HttpHeadersInterface = {};
  private readonly REQUEST_TIMEOUT: number = 30000;
  private token?: string | null = null;

  constructor() {}

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
        params: params,
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
      const response = await axios.post(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response.data;
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
      await this.buildHeaders();
      const response = await axios.post(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response.data;
    } catch (error) {
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
      const response = await axios.post(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async delete(
    url: string,
    body?: never,
    responseType: string = "json",
  ): Promise<AxiosResponse> {
    try {
      await this.buildHeaders();
      const response = await axios.post(url, body, {
        headers: this.getHeaders(),
        timeout: this.REQUEST_TIMEOUT,
        responseType: responseType as "json",
      });
      return response.data;
    } catch (error) {
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
    this.headers = {};
    return headers;
  }

  private async buildHeaders(): Promise<void> {
    try {
      this.token = undefined;
      if (!this.token) {
        //this.token = await this.storage.get("token");
        this.token = await this.cookies.get("user-token");
      }
      if (this.token) {
        this.setHeader("Authorization", "Bearer " + this.token!);
      }
    } catch {
      return Promise.resolve();
    }
  }
}
