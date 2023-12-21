import {format} from 'date-fns';

function formattedDate(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

function formattedDateTime(date: Date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

export const dateUtils = {
  formattedDate,
  formattedDateTime,
};
