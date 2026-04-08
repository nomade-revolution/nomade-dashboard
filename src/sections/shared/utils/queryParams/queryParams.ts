export const setOrDeleteSearchParam = (
  params: URLSearchParams,
  key: string,
  value: string | number | null | undefined,
): void => {
  if (value === null || value === undefined || value === "") {
    params.delete(key);
    return;
  }

  params.set(key, String(value));
};

export const toCleanQueryString = (params: URLSearchParams): string => {
  const cleaned = new URLSearchParams();

  params.forEach((value, key) => {
    if (value !== "") {
      cleaned.set(key, value);
    }
  });

  return cleaned.toString();
};
