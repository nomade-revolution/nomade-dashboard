import environments from "@environments";
import { FilterParams } from "sections/shared/interfaces/interfaces";

export const GET_USERS = (
  page?: number,
  per_page?: number,
  filterParams: FilterParams = {},
) => {
  const filters = Object.keys(filterParams)
    .map((key) => `filters[${key}]=${filterParams[key]}`)
    .join("&");

  const paginationParams = [];

  if (page !== undefined) {
    paginationParams.push(`page=${page}`);
  }

  if (per_page !== undefined) {
    paginationParams.push(`per_page=${per_page}`);
  }

  const pagination = paginationParams.join("&");

  return `${environments.API_PUBLIC_URL}/users${
    pagination ? `?${pagination}` : ""
  }${filters ? `${pagination ? "&" : "?"}${filters}` : ""}`;
};
