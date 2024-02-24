import { Outlet, json } from '@remix-run/react';
import { getPublishedChampionships } from '#.server/api/championship';
import { AppHeader } from './app-header';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-5xl pt-16 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
