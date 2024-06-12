import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, json, useLoaderData } from '@remix-run/react';
import { ChampionshipProvider } from '#utils/app/championship.context.js';
import { requireAdmin } from '#utils/auth/auth.server';
import { db } from '#utils/db.server';
import { ManagerHeader } from './manager-header';
import { ManagerNav } from './manager-nav';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const championships = await db.championship.findMany({
    orderBy: { nr: 'desc' },
  });
  return json({ championships });
}

export default function ManagerLayout() {
  const { championships } = useLoaderData<typeof loader>();
  return (
    <ChampionshipProvider championships={championships}>
      <div className="relative isolate flex min-h-svh w-full md:flex-col">
        <div className="fixed inset-y-0 left-0 hidden w-52 border-default border-r bg-app-subtle shadow-medium md:flex">
          <ManagerNav />
        </div>
        <div className="flex flex-1 flex-col md:pl-52">
          <ManagerHeader />
          <div className="p-2 pb-4 md:px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </ChampionshipProvider>
  );
}
