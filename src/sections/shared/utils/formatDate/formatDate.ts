const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

export default formatDate;
