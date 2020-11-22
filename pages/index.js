import { useRouter } from 'next/router';
import { useContext } from 'react';

import AppContext from '../contexts/app-context';

export default function Home() {
  const router = useRouter();
  const { isAppAuthorised } = useContext(AppContext);

  if (isAppAuthorised) {
    router.push('/calendar');
  }

  return null;
}
