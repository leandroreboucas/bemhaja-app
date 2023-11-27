import { format } from 'date-fns';

function formattedDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

export const dateUtils = {
    formattedDate,
};
