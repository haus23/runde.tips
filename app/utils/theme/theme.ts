import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import type { loader } from '#root';

import type { ColorScheme } from './types';
export type { ColorScheme } from './types';

type ThemeMode = 'session' | 'client';
const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  const mode: ThemeMode = data?.requestInfo.theme ? 'session' : 'client';
  const needsFallback = !!data?.requestInfo.hints.fallback;

  const theme = {
    colorScheme:
      data?.requestInfo.theme?.colorScheme ??
      data?.requestInfo.hints.colorScheme ??
      'light',
  };

  const setTheme = useCallback(
    (theme: { colorScheme: ColorScheme | 'system' }) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { theme, mode, needsFallback, setTheme };
}
