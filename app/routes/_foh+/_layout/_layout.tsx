import { Outlet, json, useLoaderData } from '@remix-run/react';
import { db } from '#utils/db.server';
import { AppHeader } from './app-header';

export async function loader() {
  const championships = await db.championship.findMany({
    where: { published: true },
    orderBy: { nr: 'desc' },
  });
  return json({ championships });
}

export default function FohLayout() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-5xl pt-14 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
