import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#routes/_foh+/_layout/_layout';
import { invariant } from '#utils/misc';

export function usePublishedChampionships() {
  const data = useRouteLoaderData<typeof loader>(
    'routes/_foh+/_layout/_layout',
  );
  invariant(typeof data !== 'undefined');

  return data.championships;
}
