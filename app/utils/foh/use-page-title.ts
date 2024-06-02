import { useMatches, useParams } from '@remix-run/react';
import { useChampionship } from './championship.context';

type RouteHandle = {
  pageTitle: string;
};

function hasPageTitle(handle: unknown): handle is RouteHandle {
  return typeof handle === 'object' && handle !== null && 'pageTitle' in handle;
}

export function usePageTitle() {
  const matches = useMatches();
  const { championship: slug } = useParams();
  const { championships } = useChampionship();

  const handle = matches.at(-1)?.handle;

  if (hasPageTitle(handle)) {
    return handle.pageTitle;
  }

  const championship =
    championships.find((c) => c.slug === slug) || championships[0];
  return championship?.name || '';
}
