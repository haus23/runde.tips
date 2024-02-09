import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { requireAdmin } from '#app/.server/auth';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div>
      <h1>Manager</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
