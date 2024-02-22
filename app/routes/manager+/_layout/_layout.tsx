import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { requireAdmin } from '#.server/auth';
import { ThemeMenu } from '#components';
import { Sidebar } from './sidebar';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div className="md:ml-60">
      <Sidebar />
      <main className="relative">
        <div className="absolute top-2 right-4">
          <ThemeMenu />
        </div>
        <Outlet />
      </main>
    </div>
  );
}