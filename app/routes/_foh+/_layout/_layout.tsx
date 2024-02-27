import { Outlet, json } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/cache.server';
import { FohProvider } from '#utils/foh/foh-context';
import { AppHeader } from './app-header';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  return (
    <FohProvider>
      <AppHeader />
      <main className="mx-auto max-w-5xl pt-14 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </FohProvider>
  );
}
