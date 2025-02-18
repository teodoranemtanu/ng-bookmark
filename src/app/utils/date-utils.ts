import dayjs from 'dayjs';

export const isDateToday = (dateToCheck: Date): boolean => dayjs().isSame(dateToCheck, 'day');

export const isDateYesterday = (dateToCheck: Date): boolean => dayjs().subtract(1, 'day').isSame(dateToCheck, 'day');