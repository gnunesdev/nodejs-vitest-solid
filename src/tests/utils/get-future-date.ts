import { parseISO, setYear } from "date-fns";

export const getFutureDate = (date: string) => {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
};
