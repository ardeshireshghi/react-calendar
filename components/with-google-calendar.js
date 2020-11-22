import { useEffect, useState } from 'react';

import useGoogleCalender from '../hooks/google-calender';
import { loadAsyncScript } from '../services/script-loader';

export function withGoogleCalendar(WrappedComponent) {
  return (props) => {
    const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
    const [isAppAuthorised, signUserOut] = useGoogleCalender(
      googleScriptLoaded
    );

    const loadGoogleApiScript = async () => {
      await loadAsyncScript('https://apis.google.com/js/api.js');
      setGoogleScriptLoaded(true);
    };

    useEffect(() => {
      loadGoogleApiScript();
    }, []);

    return (
      <WrappedComponent
        {...props}
        isAppAuthorised={isAppAuthorised}
        signOut={signUserOut}
      />
    );
  };
}
