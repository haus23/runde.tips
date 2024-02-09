import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  Await,
  type ClientActionFunctionArgs,
  Form,
  defer,
  json,
  useActionData,
} from '@remix-run/react';
import { Button } from '@tipprunde/ui';
import { toast } from 'sonner';
import { db } from '#app/.server/db';

export async function loader({ request }: LoaderFunctionArgs) {
  const championships = await db.championship.findMany({
    orderBy: { nr: 'asc' },
  });

  const legacyChampionships = await fetch(
    'https://backend.runde.tips/api/v1/championships',
  ).then((response) => response.json());

  return json({ championships, legacyChampionships });
}

export async function action() {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"routes":true,"resources":[],"standings":"rr2324"}',
  };

  const invalidateResult = await fetch(
    'https://backend.runde.tips/api/invalidate-cache',
    options,
  ).then((response) => response.json());
  return json({ invalidateResult });
}

export async function clientAction({
  request,
  serverAction,
}: ClientActionFunctionArgs) {
  const result = serverAction<typeof action>();

  toast.promise(result, {
    loading: 'Cache Daten werden gelöscht...',
    success: (data) =>
      `Daten von ${data.invalidateResult.cleared.length} Route(n) gelöscht.`,
  });

  return result;
}

export default function SyncRoute() {
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <h2 className="text-2xl font-medium">Datenabgleich</h2>
      <div className="bg-app-subtle rounded-md border border-neutral p-4 flex flex-col gap-y-4">
        <h3 className="text-xl font-medium">Backend-Daten</h3>
        <p className="text-app-notice">
          Hiermit werden die Cache-Daten des Backends gelöscht. Damit kann die
          zur Zeit noch laufende Tipprunden-Anwendung wieder aktuelle Daten
          anzeigen und wir bei den Synchronisierungen unten ebenfalls auf
          aktuellste Daten zurückgreifen.
        </p>
        <p className="text-app-notice">
          Zur Zeit sind die zu löschenden Routen noch hart codiert. Während
          eines laufenden Turniers ändert sich da auch nicht viel. Es könnten
          neue Teams oder neue Mannschaften dazukommen. Bis Sommer sollte das
          entweder alles obsolet sein oder hier eine Auswahlmöglichkeit
          realisert sein.
        </p>
        <Form method="post">
          <Button variant="accent" type="submit">
            Cache löschen
          </Button>
        </Form>
      </div>
    </div>
  );
}
