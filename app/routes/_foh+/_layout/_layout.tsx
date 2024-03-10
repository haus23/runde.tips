import { Outlet, json } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/foh/championships.server';
import { Header } from './header';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl pb-10 sm:px-6 lg:px-8 mt-2">
        <Outlet />
      </main>
    </>
  );
}
