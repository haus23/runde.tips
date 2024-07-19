import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';

import type { loader } from '#root';
import type { Theme, ThemeMode } from './types';

export { ClientHintsFallback } from './client-hints-fallback';
export { cookieName } from './types';

export const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  const needsFallback = !!data?.requestInfo.theme.hints.fallback;
  const mode = 'client' satisfies ThemeMode;

  const effectiveColorScheme =
    data?.requestInfo.theme.hints.colorScheme ?? 'light';

  const theme = {
    colorScheme: 'system', // data?.requestInfo.theme?.colorScheme || 'system',
    themeColor: 'default', // The only implemented themeColor
  } satisfies Theme;

  const setTheme = useCallback(
    (theme: Theme) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { effectiveColorScheme, mode, needsFallback, setTheme, theme };
}
