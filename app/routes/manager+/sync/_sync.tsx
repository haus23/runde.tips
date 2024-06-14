import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, useFetcher, useFetchers, useLoaderData } from '@remix-run/react';
import { nanoid } from 'nanoid';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import UI from '#components/ui';
import { requireAdmin } from '#utils/auth/auth.server.js';
import { db } from '#utils/db.server';
import { getFirestoreChampionships } from '#utils/firestore/championship';
import { useTask } from '#utils/task';

export const handle = { pageTitle: 'Datenabgleich' };

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const championships = await db.championship.findMany();
  const legacyChampionships = await getFirestoreChampionships();
  const taskId = nanoid();
  return json({ championships, legacyChampionships, taskId });
}

export default function SyncRoute() {
  const { championships, legacyChampionships, taskId } =
    useLoaderData<typeof loader>();

  const cacheData = useFetcher();
  const masterData = useFetcher();

  const { startTask } = useTask(taskId, '/action/sync/championship');

  const fetchers = useFetchers();
  const isSubmmitting = fetchers.some(
    (fetcher) => fetcher.state === 'submitting',
  );

  for (const legacyChampionship of legacyChampionships) {
    const current = championships.find((c) => c.slug === legacyChampionship.id);
    legacyChampionship.synced = !!current;
    legacyChampionship.localCompleted = current?.completed || false;
  }

  function syncChmpionship(
    championship: Awaited<ReturnType<typeof getFirestoreChampionships>>[number],
  ) {
    const formData = new FormData();
    formData.set('championshipSlug', championship.id);
    startTask(formData, {
      title: `Abgleich ${championship.name}`,
      loading: 'Spiele und Mitspieler ...',
      success: 'Synchronisierung erfolgreich',
    });
  }

  return (
    <div className="flex flex-col gap-y-6">
      <UI.Collapsible defaultOpen>
        <UI.CollapsibleTrigger>Backend-Daten</UI.CollapsibleTrigger>
        <UI.Divider />
        <UI.CollapsibleContent className="flex flex-col gap-y-4 p-4">
          <p className="text-app-subtle">
            Hiermit werden die Cache-Daten des Backends gelöscht. Damit kann die
            zur Zeit noch laufende Tipprunden-Anwendung wieder aktuelle Daten
            anzeigen.
          </p>
          <p className="text-app-subtle">
            Zur Zeit sind die zu löschenden Routen noch hart codiert. Während
            eines laufenden Turniers ändert sich da auch nicht viel. Es könnten
            neue Teams oder neue Mannschaften dazukommen. Bis Sommer sollte das
            entweder alles obsolet sein oder hier eine Auswahlmöglichkeit
            realisert sein.
          </p>
          <cacheData.Form method="post" action="/action/sync/clear-cache">
            <UI.Button
              type="submit"
              variant="solid"
              color="accent"
              isDisabled={isSubmmitting}
            >
              Cache löschen
            </UI.Button>
          </cacheData.Form>
        </UI.CollapsibleContent>
      </UI.Collapsible>

      <UI.Collapsible>
        <UI.CollapsibleTrigger>Stammdaten</UI.CollapsibleTrigger>
        <UI.Divider />
        <UI.CollapsibleContent className="flex flex-col gap-y-4">
          <p className="text-app-subtle">
            Stammdaten sind die unveränderlichen Daten, die in den jeweiligen
            Turnieren benutzt werden: Spieler, Mannschaften/Teams, Ligen und
            Regelwerke. Diese Daten sind relativ stabil und ändern sich maximal
            bei neuen Runden oder neuen Turnieren.
          </p>
          <p className="text-app-subtle">
            Solange die Firestore-Datenbank maßgeblich die Daten besitzt, müssen
            - nach Änderungen dieser - die lokalen Daten der Anwendung
            synchronisiert werden.
          </p>
          <masterData.Form method="post" action="/action/sync/master-data">
            <div className="flex flex-wrap justify-around gap-4">
              <UI.Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="players"
              >
                Spieler
              </UI.Button>
              <UI.Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="teams"
              >
                Teams
              </UI.Button>
              <UI.Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="leagues"
              >
                Ligen
              </UI.Button>
              <UI.Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="rulesets"
              >
                Regelwerke
              </UI.Button>
            </div>
          </masterData.Form>
        </UI.CollapsibleContent>
      </UI.Collapsible>
      <UI.Card>
        <UI.CardHeader id="tableLabel">Turnierdaten</UI.CardHeader>
        <UI.Divider />
        <UI.CardContent className="px-0 sm:px-4">
          <Table className="text-sm" aria-labelledby="tableLabel">
            <TableHeader className="bg-accent text-xs uppercase">
              <Column className="px-2 py-2 text-right md:px-6">Nr</Column>
              <Column className="px-2 text-left md:px-6" isRowHeader>
                Titel
              </Column>
              <Column className="px-2 md:px-6">Status</Column>
              <Column className="px-2 md:px-6">Aktion</Column>
            </TableHeader>
            <TableBody className="divide-y divide-default">
              {legacyChampionships.map((lc) => (
                <Row key={lc.id}>
                  <Cell className="pr-2 text-end md:px-6">{lc.nr}</Cell>
                  <Cell className="w-full px-2 py-2.5 md:px-6">{lc.name}</Cell>
                  <Cell className="px-2 text-center sm:whitespace-nowrap md:px-6">
                    {lc.synced
                      ? lc.localCompleted
                        ? 'Fertig'
                        : 'Laufend'
                      : 'Nicht geladen'}
                  </Cell>
                  <Cell className="px-2 text-center md:px-6">
                    {lc.synced && lc.localCompleted ? (
                      <span>Keine</span>
                    ) : (
                      <UI.Button
                        onPress={() => syncChmpionship(lc)}
                        variant="solid"
                        color="accent"
                        className="my-2"
                        isDisabled={isSubmmitting}
                      >
                        Abgleich
                      </UI.Button>
                    )}
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </UI.CardContent>
      </UI.Card>
    </div>
  );
}
