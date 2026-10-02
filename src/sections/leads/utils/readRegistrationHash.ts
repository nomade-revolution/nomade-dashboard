export const readRegistrationHash = (search: string): string | null => {
  const query = search.startsWith("?") ? search.slice(1) : search;
  const marker = "hash=";
  let from = 0;

  while (from < query.length) {
    const start = query.indexOf(marker, from);
    if (start === -1) {
      return null;
    }

    const isParamStart = start === 0 || query[start - 1] === "&";
    if (!isParamStart) {
      from = start + marker.length;
      continue;
    }

    const valueStart = start + marker.length;
    const nextParam = query.indexOf("&", valueStart);
    const raw =
      nextParam === -1
        ? query.slice(valueStart)
        : query.slice(valueStart, nextParam);

    if (raw.length === 0) {
      return null;
    }

    try {
      return decodeURIComponent(raw);
    } catch {
      return null;
    }
  }

  return null;
};
