import { json, useFetcher, useLoaderData } from '@remix-run/react';
import { getFirestoreChampionships } from '#.server/api/firestore/championships';
import { db } from '#.server/db';
import { Button } from '#components/(ui)';

export async function loader() {
  const championships = await db.championship.findMany();

  const legacyChampionships = await getFirestoreChampionships();

  return json({ championships, legacyChampionships });
}

export default function SyncRoute() {
  const fetcher = useFetcher();

  const { championships, legacyChampionships } = useLoaderData<typeof loader>();

  for (const legacyChampionship of legacyChampionships) {
    const current = championships.find((c) => c.slug === legacyChampionship.id);
    legacyChampionship.synced = !!current;
  }

  return (
    <div className="p-4 flex flex-col gap-y-8">
      <h2 className="text-2xl font-medium">Datenabgleich</h2>
      <div className="bg-app-subtle rounded-md border border-neutral p-4 flex flex-col gap-y-4">
        <h3 className="text-xl font-medium">Backend-Daten</h3>
        <p className="text-app-notice">
          Hiermit werden die Cache-Daten des Backends gelöscht. Damit kann die
          zur Zeit noch laufende Tipprunden-Anwendung wieder aktuelle Daten
          anzeigen.
        </p>
        <p className="text-app-notice">
          Zur Zeit sind die zu löschenden Routen noch hart codiert. Während
          eines laufenden Turniers ändert sich da auch nicht viel. Es könnten
          neue Teams oder neue Mannschaften dazukommen. Bis Sommer sollte das
          entweder alles obsolet sein oder hier eine Auswahlmöglichkeit
          realisert sein.
        </p>
        <fetcher.Form action="/action/sync/clear-cache" method="post">
          <Button
            color="accent"
            type="submit"
            isDisabled={fetcher.state === 'submitting'}
          >
            Cache löschen
          </Button>
        </fetcher.Form>
      </div>
      <div className="bg-app-subtle rounded-md border border-neutral p-4 flex flex-col gap-y-4">
        <h3 className="text-xl font-medium">Lokale Daten</h3>
        <table>
          <thead>
            <tr>
              <th>Nr</th>
              <th>Titel</th>
              <th>Status</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {legacyChampionships.map((lc) => (
              <tr key={lc.id}>
                <td>{lc.nr}</td>
                <td>{lc.name}</td>
                <td>
                  {lc.synced
                    ? lc.completed
                      ? 'Abgeschlossen'
                      : 'Laufend'
                    : 'Nicht geladen'}
                </td>
                <td>
                  <Button>Abgleich</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
