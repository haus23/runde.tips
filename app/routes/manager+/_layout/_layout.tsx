import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, json } from '@remix-run/react';
import { requireAdmin } from '#utils/auth/auth.server';
import { db } from '#utils/db.server';
import { ChampionshipProvider } from '#utils/manager/championship.context';
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
  return (
    <ChampionshipProvider>
      <div className="grid h-dvh grid-cols-[auto_1fr]">
        <ManagerNav className="w-0 overflow-y-auto border-default border-r bg-app-subtle shadow-medium md:flex md:w-52" />
        <div className="grid grid-rows-[56px_1fr] overflow-y-auto px-2 md:px-4">
          <ManagerHeader />
          <div className="pt-2 pb-4">
            <Outlet />
          </div>
        </div>
      </div>
    </ChampionshipProvider>
  );
}
