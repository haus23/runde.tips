import type { LoaderFunctionArgs } from '@remix-run/node';
import { requireAdmin } from '#utils/auth/auth.server';

export const handle = { pageTitle: 'Dashboard' };

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  return null;
}

export default function DashboardRoute() {
  return <div />;
}
