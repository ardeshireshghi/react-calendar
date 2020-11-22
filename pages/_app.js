import React from 'react';
import App from 'next/app';
import AppContext from '../contexts/app-context';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { withGoogleCalendar } from '../components/with-google-calendar';
import theme from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
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
        <>
        <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      </AppContext.Provider>
    );
  }
}

export default withGoogleCalendar(CalendarApp);
