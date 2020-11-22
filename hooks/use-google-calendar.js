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
    }
  };

  useEffect(() => {
    scriptLoaded && gapi.load('client:auth2', initClient);
  }, [scriptLoaded]);

  return [isAppAuthorised, signUserOut];
}
