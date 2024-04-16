import { useMatches } from '@remix-run/react';

type RouteHandle = {
  pageTitle: string;
};

function hasPageTitle(handle: unknown): handle is RouteHandle {
  return typeof handle === 'object' && handle !== null && 'pageTitle' in handle;
}

export function usePageTitle() {
  const matches = useMatches();

  const handle = matches.at(-1)?.handle;

  if (hasPageTitle(handle)) {
    return handle.pageTitle;
  }
  return 'Manager';
}
