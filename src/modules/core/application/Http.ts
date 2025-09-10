import {
  HttpErrorResponseInterface,
  HttpInterface,
  HttpResponseInterface,
} from "@core/domain";
import Cookies from "js-cookie";
import { HttpImplementation } from "@core/infrastructure";
import environments from "@environments";

export class Http implements HttpInterface {
  private static instance: Http;

  private constructor(private httpInmplementation: HttpInterface) {}

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http(new HttpImplementation());
    }
    return Http.instance;
  }

  public async get<T>(
    url: string,
    params?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.get(
      url,
      params,
      responseType,
    );
    if ("success" in response && response.success) {
      return response as HttpResponseInterface<T>;
    } else {
      if (response.statusText === "Unauthorized") {
        const token = await Cookies.get(environments.cookies!);
        if (token) {
          await Cookies.remove(environments.cookies!);
          window.location.href = "logout";
        }
      }

      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public async getFile<T>(
    url: string,
    params?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.get(
      url,
      params,
      responseType as "json",
    );

    if (response.data) {
      return response as HttpResponseInterface<T>;
    } else {
      if (response.statusText === "Unauthorized") {
        const token = await Cookies.get(environments.cookies!);
        if (token) {
          await Cookies.remove(environments.cookies!);
          window.location.href = "logout";
        }
      }

      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public async post<T>(
    url: string,
    body?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.post(
      url,
      body,
      responseType,
    );

    // DEV-only debug logging
    const isDev = import.meta.env.MODE !== "production";
    if (isDev && url.includes("/companies/")) {
      // Debug logging removed for production
    }

    if ("success" in response && response.success) {
      return response as HttpResponseInterface<T>;
    } else {
      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public async patch<T>(
    url: string,
    body?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.patch(
      url,
      body,
      responseType,
    );

    if ("success" in response && response.success) {
      return response as HttpResponseInterface<T>;
    } else {
      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public async put<T>(
    url: string,
    body?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.put(
      url,
      body,
      responseType,
    );

    if ("success" in response && response.success) {
      return response as HttpResponseInterface<T>;
    } else {
      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public async delete<T>(
    url: string,
    body?: unknown,
    responseType?: string,
  ): Promise<HttpResponseInterface<T>> {
    const response = await this.httpInmplementation.delete(
      url,
      body,
      responseType,
    );

    if ("success" in response && response.success) {
      return response as HttpResponseInterface<T>;
    } else {
      return {
        code: response.status,
        ...response.data,
      } as HttpErrorResponseInterface;
    }
  }

  public setHeader(headerKey: string, headerValue: string): void {
    this.httpInmplementation.setHeader(headerKey, headerValue);
  }
}
