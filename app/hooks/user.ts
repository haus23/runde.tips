/*
 * User/Auth hooks for the client
 *
 * - useUser(): returns user object and auth state
 */

import { useRouteLoaderData } from 'react-router';
import type { loader } from '~/root';

export function useUser() {
  const data = useRouteLoaderData<typeof loader>('root');

  return {
    isAuthenticated: !!data?.user,
    isManager: data?.user?.role === 'ADMIN',
    current: data?.user || null,
  };
}
