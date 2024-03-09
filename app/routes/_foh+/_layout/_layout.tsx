import { Outlet, json } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/foh/championships.server';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  return (
    <>
      <main className="mx-auto max-w-5xl pb-10 px-2 sm:px-6 lg:px-8 mt-2">
        <Outlet />
      </main>
    </>
  );
}
