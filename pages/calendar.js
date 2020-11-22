import Head from 'next/head';
import { useContext } from 'react';

import AppContext from '../contexts/app-context';

export default function Calendar() {
  const { isAppAuthorised, signOut } = useContext(AppContext);

  if (!isAppAuthorised) {
    return null;
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <button onClick={signOut}>Sign Out</button>
        <h1 role="heading" className="title">
          Calender goes here
        </h1>
      </main>
    </div>
  );
}
