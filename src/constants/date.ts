import { format as formatDate, parseISO } from "date-fns";

export const formatDateTime = (dateString: string | null, format: string) => {
  if (!dateString) return null;
  const date = parseISO(dateString);
  return formatDate(date, format).toLocaleLowerCase();
};
