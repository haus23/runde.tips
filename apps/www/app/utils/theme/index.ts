import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#root';

export { ClientHintsFallback } from './client-hints-fallback';

export function useTheme() {
  const data = useRouteLoaderData<typeof loader>('root');

  const effectiveColorScheme =
    data?.requestInfo.theme.hints.colorScheme ?? 'light';
  const needsFallback = !!data?.requestInfo.theme.hints.fallback;

  return { effectiveColorScheme, needsFallback };
}
