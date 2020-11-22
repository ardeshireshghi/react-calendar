import React from 'react';
import App from 'next/app';
import AppContext from '../contexts/app-context';
import { withGoogleCalendar } from '../components/with-google-calendar';

export class CalendarApp extends App {
  render() {
    const { Component, pageProps, isAppAuthorised, signOut } = this.props;

    return (
      <AppContext.Provider value={{ isAppAuthorised, signOut }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    );
  }
}

export default withGoogleCalendar(CalendarApp);
