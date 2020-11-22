import Head from 'next/head';
import { useContext, useEffect } from 'react';

import AppContext from '../contexts/app-context';
import { useCalendarData } from '../contexts/calendar-data-context';
import CalendarHeading from '../components/calendar-heading';
import CalendarWeeklyView from '../components/calendar-weekly-view';
import {
  formattedDayMonthFromDate,
  startEndDatesOfWeek
} from '../services/date';
import { fetchWeeklyEvents } from '../services/google-calendar-api-client';

export default function Calendar() {
  const { isAppAuthorised } = useContext(AppContext);
  const { setCalendarEvents, activeCalendars } = useCalendarData();
  const { startDate, endDate } = startEndDatesOfWeek(new Date());

  useEffect(() => {
    if (isAppAuthorised) {
      getEventsData({ startDate, endDate });
    }
  }, [isAppAuthorised]);

  if (!isAppAuthorised) {
    return null;
  }

  const getEventsData = async ({ startDate, endDate }) => {
    const events = await fetchWeeklyEvents({
      startDate,
      endDate,
      calendarId: activeCalendars[0]
    });

    setCalendarEvents({
      primary: events
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Calendar App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CalendarHeading text={formattedDayMonthFromDate(new Date())} />
        <CalendarWeeklyView startDate={startDate} endDate={endDate} />
      </main>
    </div>
  );
}
