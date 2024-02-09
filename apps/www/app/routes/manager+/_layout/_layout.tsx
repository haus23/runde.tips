import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { requireAdmin } from '#app/.server/auth';
import { Sidebar } from './sidebar';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div>
      <Sidebar />
      <main className="md:pl-60">
        <Outlet />
      </main>
    </div>
  );
}
