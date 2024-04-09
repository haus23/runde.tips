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
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Divider,
} from '#components/ui';
import { db } from '#utils/db.server';
import { getFirestoreChampionships } from '#utils/firestore/championship';
import { useTask } from '#utils/task';

export async function loader() {
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
      <h2 className="text-2xl">Datenabgleich</h2>

      <Collapsible defaultOpen>
        <CollapsibleTrigger>Backend-Daten</CollapsibleTrigger>
        <Divider />
        <CollapsibleContent className="p-4 flex flex-col gap-y-4">
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
            <Button
              type="submit"
              variant="solid"
              color="accent"
              isDisabled={isSubmmitting}
            >
              Cache löschen
            </Button>
          </cacheData.Form>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>Stammdaten</CollapsibleTrigger>
        <Divider />
        <CollapsibleContent className="flex flex-col gap-y-4">
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
            <div className="flex flex-wrap justify-around">
              <Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="players"
              >
                Spieler
              </Button>
              <Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="teams"
              >
                Teams
              </Button>
              <Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="leagues"
              >
                Ligen
              </Button>
              <Button
                isDisabled={isSubmmitting}
                color="accent"
                type="submit"
                name="action"
                value="rulesets"
              >
                Regelwerke
              </Button>
            </div>
          </masterData.Form>
        </CollapsibleContent>
      </Collapsible>
      <Card>
        <CardHeader id="tableLabel">Turnierdaten</CardHeader>
        <Divider />
        <CardContent>
          <Table className="text-sm" aria-labelledby="tableLabel">
            <TableHeader className="bg-accent text-xs uppercase">
              <Column className="py-2 px-2 md:px-6 text-right">Nr</Column>
              <Column className="px-2 md:px-6 text-left" isRowHeader>
                Titel
              </Column>
              <Column className="px-2 md:px-6">Status</Column>
              <Column className="px-2 md:px-6">Aktion</Column>
            </TableHeader>
            <TableBody className="divide-y divide-default">
              {legacyChampionships.map((lc) => (
                <Row key={lc.id}>
                  <Cell className="pr-4 md:px-6 text-right">{lc.nr}</Cell>
                  <Cell className="w-full sm:py-2.5 px-2 md:px-6">
                    {lc.name}
                  </Cell>
                  <Cell className="text-center px-2 md:px-6 sm:whitespace-nowrap">
                    {lc.synced
                      ? lc.completed
                        ? 'Abgeschlossen'
                        : 'Laufend'
                      : 'Nicht geladen'}
                  </Cell>
                  <Cell className="text-center px-2 md:px-6">
                    {lc.synced && lc.completed ? (
                      <span>Keine</span>
                    ) : (
                      <Button
                        onPress={() => syncChmpionship(lc)}
                        variant="solid"
                        color="accent"
                        className="my-2"
                        isDisabled={isSubmmitting}
                      >
                        Abgleich
                      </Button>
                    )}
                  </Cell>
                </Row>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
