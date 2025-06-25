import { ensureOnboardingSession, requireAnonymous } from '~/utils/auth.server';
import type { Route } from './+types/verify';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  await ensureOnboardingSession(request);
}

export default function LoginRoute() {
  return (
    <div>
      <title>Kontrolle - runde.tips</title>
      <h1 className="font-medium text-2xl">Kontrolle</h1>
    </div>
  );
}
