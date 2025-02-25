export const formatDateWithSlash = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

export const formatDateWithDash = (valueDate: string) => {
  const date = new Date(valueDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateWithTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};

// function that converts DD-MM-YYYY to YYYY-MM-DD
export const formatDateToISO = (date: string): Date => {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
};
