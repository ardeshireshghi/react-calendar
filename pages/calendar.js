import Head from 'next/head';
import { useContext } from 'react';

import AppContext from '../contexts/app-context';
import CalendarHeading from '../components/calendar-heading';
import { formattedDayMonthFromDate } from '../services/date';

export default function Calendar() {
  const { isAppAuthorised } = useContext(AppContext);

  if (!isAppAuthorised) {
    return null;
  }

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
