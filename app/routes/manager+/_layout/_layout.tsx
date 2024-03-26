import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { ThemeMenu } from '#components/theme-menu';
import { requireAdmin } from '#utils/auth/auth.server';
import { Sidebar } from './sidebar';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div className="md:ml-52">
      <Sidebar />
      <main className="relative pt-2 px-4 pb-4">
        <div className="absolute top-2 right-4">
          <ThemeMenu />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
