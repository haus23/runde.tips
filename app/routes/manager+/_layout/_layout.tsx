import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { requireAdmin } from '#utils/auth/auth.server';
import { ManagerHeader } from './manager-header';
import { ManagerNav } from './manager-nav';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  return null;
}

export default function ManagerLayout() {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr]">
      <ManagerNav className="w-0 overflow-y-auto border-default border-r bg-app-subtle shadow-medium md:flex md:w-52" />
      <div className="grid grid-rows-[56px_1fr] overflow-y-auto px-2 md:px-4">
        <ManagerHeader />
        <div className="pt-2 pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
