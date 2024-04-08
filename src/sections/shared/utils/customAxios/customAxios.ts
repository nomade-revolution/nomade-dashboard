import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

type fetchMethodsType = "PUT" | "GET" | "POST" | "DELETE" | "PATCH";

interface CustomFetchResponseStructure {
  success: boolean;
  data?: null | unknown;
  error?: string;
}

const customAxios = async (
  method: fetchMethodsType,
  url: string,
  configs?: AxiosRequestConfig,
): Promise<CustomFetchResponseStructure> => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const headers = {
      ...defaultHeaders,
      Authorization: `Bearer ${
        configs?.headers?.Authorization || Cookies.get("user-token")
      }`,
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      data: configs?.data,
      ...configs,
    };

    const response: AxiosResponse = await axios(config);

    if (response.status === 401) {
      Cookies.remove("user-token");
    }

    if (!response.statusText) {
      return { success: false, error: "Network error" };
    }

    const data = response.data;

    if (data.success) {
      return {
        data: data.data,
        success: data.success,
      };
    }

    return { error: data.error, success: data.success };
  } catch (error: unknown) {
    return { error: (error as Error).message, success: false };
  }
};

export default customAxios;
