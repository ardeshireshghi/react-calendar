import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';

import AppContext from '../contexts/app-context';
import CalendarHeading from '../components/calendar-heading';
import CalendarWeeklyView from '../components/calendar-weekly-view';
import {
  formattedDayMonthFromDate,
  startEndDatesOfWeek
} from '../services/date';
import { fetchWeeklyEvents } from '../services/google-calendar-api-client';

export default function Calendar() {
  const { isAppAuthorised } = useContext(AppContext);
  const [calendarEvents, setCalendarEvents] = useState({});

  useEffect(() => {
    if (isAppAuthorised) {
      const { startDate, endDate } = startEndDatesOfWeek(new Date());

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
      calendarId: 'primary'
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
      </main>
    </div>
  );
}
