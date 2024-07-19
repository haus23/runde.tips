import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#root';
import type { ThemeMode } from './types';

export { ClientHintsFallback } from './client-hints-fallback';
export { cookieName } from './types';

export function useTheme() {
  const data = useRouteLoaderData<typeof loader>('root');

  const needsFallback = !!data?.requestInfo.theme.hints.fallback;
  const mode = 'client' satisfies ThemeMode;

  const effectiveColorScheme =
    data?.requestInfo.theme.hints.colorScheme ?? 'light';

  return { effectiveColorScheme, mode, needsFallback };
}
