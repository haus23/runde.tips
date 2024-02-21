import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { requireAdmin } from '#app/.server/auth';
import { ThemeMenu } from '#app/routes/_foh+/_layout/theme-menu';
import { Sidebar } from './sidebar';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div>
      <Sidebar />
      <main className="md:pl-60 relative">
        <div className="absolute top-2 right-4">
          <ThemeMenu />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
