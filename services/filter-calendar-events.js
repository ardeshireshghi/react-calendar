import { formatDateToDateString } from './date';

export function selectEventsForDate(date, activeCalendars, calendarEvents) {
  const dateKey = formatDateToDateString(date);

  const matchingEvents = activeCalendars
    .filter((calendarName) => {
      const events = calendarEvents[calendarName];
      return events && events[dateKey].length > 0;
    })
    .map((calendarName) => calendarEvents[calendarName])
    .flat();

  return matchingEvents;
}
