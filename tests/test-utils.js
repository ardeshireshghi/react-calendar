import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import AppContext from '../contexts/app-context';
import { CalendarDataProvider } from '../contexts/calendar-data-context';
import theme from '../styles/theme';

export function renderWithAppContext(ui, contextValue = {}, ...options) {
  const Wrapper = ({ children }) => (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
  return render(ui, {
    ...options,
    wrapper: Wrapper
  });
}

export function renderWithAllProviders(
  ui,
  { appContext = {}, initialEventData } = {},
  ...options
) {
  const Wrapper = ({ children }) => (
    <AppContext.Provider value={appContext}>
      <CalendarDataProvider initialEventData={initialEventData}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CalendarDataProvider>
    </AppContext.Provider>
  );

  return render(ui, {
    ...options,
    wrapper: Wrapper
  });
}

// Changes `new Date()` not `Date.now()`
function mockCurrentDate(dateString) {
  const newCurrentDate = new Date(dateString);
  const realDate = Date;
  global.Date = class extends (
    Date
  ) {
    constructor(date) {
      if (date) {
        return super(date);
      }

      return newCurrentDate;
    }
  };

  return function restore() {
    global.Date = realDate;
  };
}

export { render, screen, mockCurrentDate };
