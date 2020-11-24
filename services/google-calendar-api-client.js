export const fetchWeeklyEvents = async ({
  calendarId = 'primary',
  startDate,
  endDate
} = {}) => {
  const response = await gapi.client.calendar.events.list({
    calendarId,
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 24,
    orderBy: 'startTime'
  });

  const events = response.result.items;

  return events.map((event) => {
    let start = event.start.dateTime;
    let end = event.end.dateTime;

    if (!start) {
      start = event.start.date;
      end = event.end.date;
    }

    return {
      summary: event.summary,
      start,
      end
    };
  });
};
