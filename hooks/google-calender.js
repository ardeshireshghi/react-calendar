import { useEffect, useState } from 'react';
import googleApiConfig from '../config/google-api';

const { clientId, apiKey, discoveryDocs, scopes } = googleApiConfig;

function showAuthDialog() {
  gapi.auth2.getAuthInstance().signIn();
}

async function googleClientInit() {
  await gapi.client.init({
    apiKey,
    clientId,
    discoveryDocs,
    scope: scopes
  });
}

export default function useGoogleCalendar(scriptLoaded = false) {
  const [isAppAuthorised, setAppAuthorised] = useState(false);

  const updateSigninStatus = (userSignedIn) => {
    if (userSignedIn) {
      setAppAuthorised(userSignedIn);
    } else {
      showAuthDialog();
    }
  };

  function signUserOut() {
    setAppAuthorised(false);
    gapi.auth2.getAuthInstance().signOut();
  }

  const appendPre = (message) => {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  };

  const listUpcomingEvents = async () => {
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });

    const events = response.result.items;

    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime;
        var end = event.end.dateTime;
        if (!start) {
          start = event.start.date;
          end = event.end.date;
        }
        appendPre(event.summary);
        appendPre(`Start: ${start}`);
        appendPre(`End: ${end}`);
      }
    } else {
      appendPre('No upcoming events found.');
    }
  };
  const initClient = async () => {
    try {
      await googleClientInit();
      const auth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      auth.isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(!auth ? false : auth.isSignedIn.get());
    } catch (err) {
      console.log(err);
      throw err;

      // appendPre(JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    scriptLoaded && gapi.load('client:auth2', initClient);
  }, [scriptLoaded]);

  return [isAppAuthorised, signUserOut];
}
