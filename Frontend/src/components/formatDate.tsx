import { isToday, isTomorrow, format } from "date-fns";
import { da } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return `I dag ${format(date, "HH:mm", { locale: da })}`;
  }
  if (isTomorrow(date)) {
    return `I morgen ${format(date, "HH:mm", { locale: da })}`;
  }
  return format(date, "dd MMM yyyy HH:mm", { locale: da });
};
