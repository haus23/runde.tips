import { useRevalidator, useRouteLoaderData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import type { loader } from '#root';
import { invariant } from '../misc';

export function useIsAuthenticated() {
  const data = useRouteLoaderData<typeof loader>('root');
  return !!data && !!data.user;
}

export function useIsManager() {
  const data = useRouteLoaderData<typeof loader>('root');
  return !!data && !!data.user && data.user.role.includes('ADMIN');
}

export function useUser() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data?.user, 'User is not logged in');
  return data.user;
}

export function useAuthBroadcast() {
  const channelRef = useRef<BroadcastChannel>();
  const authenticated = useIsAuthenticated();
  const revalidator = useRevalidator();

  useEffect(() => {
    channelRef.current = new BroadcastChannel('auth');

    function revalidate() {
      if (revalidator.state === 'idle') {
        revalidator.revalidate();
      }
    }
    channelRef.current.addEventListener('message', revalidate);
    return () => {
      channelRef.current?.removeEventListener('message', revalidate);
      channelRef.current?.close();
    };
  }, [revalidator]);

  useEffect(() => {
    channelRef.current?.postMessage(authenticated);
  }, [authenticated]);
}
