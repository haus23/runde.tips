import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/cache.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championships = await getPublishedChampionships();

  if (championships.length === 0) {
    return redirect('/willkommen');
  }

  return null;
}

export default function ChampionshipLayout() {
  return <Outlet />;
}
