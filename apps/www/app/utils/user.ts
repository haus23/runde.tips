import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from '@tipprunde/utils';
import type { loader } from '#root';

export function useIsAuthenticated() {
  const data = useRouteLoaderData<typeof loader>('root');
  return !!data && !!data.user;
}

export function useUser() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data?.user, 'User is not logged in');
  return data.user;
}
