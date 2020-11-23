import React from 'react';
import App from 'next/app';
import AppContext from '../contexts/app-context';
import { CalendarDataProvider } from '../contexts/calendar-data-context';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { withGoogleCalendar } from '../components/with-google-calendar';
import theme from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${theme.color.lighterGray};
    font-family: ${theme.font.family}
  }

  * {
    box-sizing: border-box;
  }
`;

export class CalendarApp extends App {
  render() {
    const { Component, pageProps, isAppAuthorised, signOut } = this.props;

    return (
      <AppContext.Provider value={{ isAppAuthorised, signOut }}>
        <CalendarDataProvider>
          <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </>
        </CalendarDataProvider>
      </AppContext.Provider>
    );
  }
}

export default withGoogleCalendar(CalendarApp);
