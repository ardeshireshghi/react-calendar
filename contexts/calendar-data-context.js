import { createContext, useContext, useState } from 'react';

const CalendarDataContext = createContext();

function CalendarDataProvider({
  initialEventData = {
    primary: []
  },
  children
}) {
  const [calendarEvents, setCalendarEvents] = useState(initialEventData);
  const [activeCalendars, setActiveCalendars] = useState(['primary']);

  return (
    <CalendarDataContext.Provider
      value={{
        calendarEvents,
        setCalendarEvents,
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
