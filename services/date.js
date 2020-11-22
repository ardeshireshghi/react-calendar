function dateAtHourZero(date) {
  date.setHours(0, 0, 0, 0);

  return date;
}

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
  let startDate = new Date(date);
  let endDate = new Date(date);

  startDate = dateAtHourZero(startDate);
  endDate = dateAtHourZero(endDate);

  // Go back to the previous sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Go forward to the end of next saturday (technically hour zero next Sunday)
  endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

  return {
    startDate,
    endDate
  };
}

export function getDayNameFromDate(date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return days[date.getDay()];
}

export function todayAtZero() {
  const date = new Date();
  return dateAtHourZero(date);
}
