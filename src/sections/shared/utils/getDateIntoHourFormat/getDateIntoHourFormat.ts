export const getDateIntoHourFormat = (dateToFormat: string) => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formatedDate = `${day}/${month}/${year} - ${hours}:${minutes}h`;

  return formatedDate;
};

export function formatSentAt(dateString: string): string {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}h`;

  return `${formattedDate} - ${formattedTime}`;
}
