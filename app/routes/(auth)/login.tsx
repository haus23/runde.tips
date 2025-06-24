import { requireAnonymous } from '~/utils/auth.server';
import type { Route } from './+types/login';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
}

export default function LoginRoute() {
  return (
    <div>
      <title>Anmeldung - runde.tips</title>
      <h1 className="font-medium text-2xl">Anmeldung</h1>
    </div>
  );
}
