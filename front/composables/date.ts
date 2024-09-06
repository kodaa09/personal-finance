import {format, parseISO} from 'date-fns';
import {fr} from 'date-fns/locale';

export function useDate() {

  function formateDate(date: string) {
    const newDate = new Date(date);
    return format(newDate, "dd/MM/yyyy", {locale: fr});
  }

  function formatedISO(date: string) {
    const dateObject = parseISO(date);
    return format(dateObject, 'yyyy-MM-dd');
  }

  return {
    formateDate,
    formatedISO
  }
}
