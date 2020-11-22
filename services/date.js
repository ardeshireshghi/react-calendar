export function formattedDayMonthFromDate(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

export function startEndDatesOfWeek(date) {
  const startDate = new Date(date);
  const endDate = new Date(date);

  // Go back to the previous sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Go forward to the end of next saturday (technically hour zero next Sunday)
  endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

  return {
    startDate,
    endDate
  };
}
