import { dateAtHourZero } from './date';

export function filterEventsForDate(date, calendarEvents) {
  const allCalendars = Object.keys(calendarEvents);
  const dayAfterDate = new Date(date);

  dayAfterDate.setDate(dayAfterDate.getDate() + 1);

  const matches = allCalendars
    .map((calendarName) => {
      const events = calendarEvents[calendarName];

      return events.filter((event) => {
        const startTimeDay = dateAtHourZero(event.start);
        const eventStartsInSameDay = startTimeDay.getTime() === date.getTime();
        return eventStartsInSameDay;
      });
    })
    .flat();

  return matches;
}
