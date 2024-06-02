import { Outlet, json, useLoaderData } from '@remix-run/react';
import { ChampionshipProvider } from '#utils/app/championship.context';
import { getPublishedChampionships } from '#utils/foh/championships.server';
import { Header } from './header';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  const { championships } = useLoaderData<typeof loader>();
  return (
    <ChampionshipProvider championships={championships}>
      <Header />
      <main className="mx-auto mt-2 max-w-4xl pb-10 lg:px-8 sm:px-6">
        <Outlet />
      </main>
    </ChampionshipProvider>
  );
}
