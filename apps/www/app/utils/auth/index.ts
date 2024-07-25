import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#root';

export function useIsAuthenticated() {
  const data = useRouteLoaderData<typeof loader>('root');
  return !!data && !!data.user;
}
