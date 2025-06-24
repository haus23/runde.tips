import { requireManager } from '~/utils/auth.server';
import type { Route } from './+types/_index';

export async function loader({ request }: Route.LoaderArgs) {
  await requireManager(request);
}

export default function DashboardRoute() {
  return (
    <div>
      <title>Hinterhof - runde.tips</title>
      <h1 className="font-medium text-2xl">Dashboard</h1>
    </div>
  );
}
