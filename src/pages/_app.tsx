import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig, type Cache } from 'swr';

import '../styles/globals.css';

function localStorageProvider() {
  if (typeof window == 'undefined') return new Map() as Cache;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const map = new Map(JSON.parse(localStorage?.getItem('app-cache') ?? '[]'));
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });
  return map as Cache;
}

const Anicore: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
};

export default Anicore;
