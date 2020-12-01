import { createContext, useContext, useMemo, useState } from 'react';
import { formatDateToDateString } from '../services/date';
import { groupBy } from '../services/group-by';

const CalendarDataContext = createContext();

function eventsGroupedByDate(events) {
  return groupBy(events, (event) => {
    const dayKey = formatDateToDateString(new Date(event.start));
    return dayKey;
  });
}

function CalendarDataProvider({
  initialEventData = {
    primary: []
  },
  children
}) {
  function addCalendarEvents(calendarName, events) {
    setCalendarEvents((prevState) => ({
      ...prevState,
      [calendarName]: {
        ...prevState[calendarName],
        ...eventsGroupedByDate(events)
      }
    }));
  }

  const [activeCalendars, setActiveCalendars] = useState(['primary']);

  const initialCalendarData = activeCalendars.reduce(
    (initialEvents, calendarName) => {
      if (!initialEventData[calendarName]) {
        return initialEvents;
      }

      return {
        ...initialEvents,
        [calendarName]: initialEventData[calendarName].length
          ? eventsGroupedByDate(initialEventData[calendarName])
          : {}
      };
    },
    {}
  );

  const [calendarEvents, setCalendarEvents] = useState(initialCalendarData);

  return (
    <CalendarDataContext.Provider
      value={{
        calendarEvents,
        addCalendarEvents,
        activeCalendars,
        setActiveCalendars
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  );
}

/**
 * @see https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */
function useCalendarData() {
  const context = useContext(CalendarDataContext);

  if (context === undefined) {
    throw new Error(
      'useCalendarData must be used within a CalendarDataProvider'
    );
  }

  return context;
}

export { CalendarDataProvider, useCalendarData };
