import {
  HttpErrorResponseInterface,
  HttpImplementation,
  HttpInterface,
  HttpResponseInterface,
} from "@core";

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
    const response = await this.httpInmplementation.post(
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
    const response = await this.httpInmplementation.post(
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
    const response = await this.httpInmplementation.post(
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
