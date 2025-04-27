export function formatDate(dateString: Date) {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'pt-BR',
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'pt-BR',
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'pt-BR',
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
}
