import { Button } from '@nextui-org/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json, useFetcher, useFetchers, useLoaderData } from '@remix-run/react';
import { clsx } from 'clsx';
import { namedAction } from 'remix-utils/named-action';
import { Disclosure, Icon } from '#components';
import { db } from '#utils/db.server';
import { getFirestoreChampionships } from '#utils/firestore/championship';
import { invariant } from '#utils/misc';
import { syncChampionship } from '#utils/sync/championship';
import { syncLeagues } from '#utils/sync/leagues';
import { syncPlayers } from '#utils/sync/players';
import { syncRulesets } from '#utils/sync/rulesets';
import { syncTeams } from '#utils/sync/teams';
import { jsonWithToast } from '#utils/toast.server';

export async function loader() {
  const championships = await db.championship.findMany();

  const legacyChampionships = await getFirestoreChampionships();

  return json({ championships, legacyChampionships });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  return namedAction(formData, {
    async championship() {
      const championshipSlug = formData.get('championshipSlug');
      invariant(typeof championshipSlug === 'string');

      const result = await syncChampionship(championshipSlug);
      return jsonWithToast(null, result);
    },
    async players() {
      await syncPlayers();
      return jsonWithToast(null, {
        type: 'success',
        msg: 'Spielerdaten synchronisiert.',
      });
    },
    async teams() {
      await syncTeams();
      return jsonWithToast(null, {
        type: 'success',
        msg: 'Mannschaften/Teams synchronisiert.',
      });
    },
    async leagues() {
      await syncLeagues();
      return jsonWithToast(null, {
        type: 'success',
        msg: 'Ligen synchronisiert.',
      });
    },
    async rulesets() {
      await syncRulesets();
      return jsonWithToast(null, {
        type: 'success',
        msg: 'Regelwerke synchronisiert.',
      });
    },
  });
}

export default function SyncRoute() {
  const legacyCache = useFetcher();
  const masterData = useFetcher();
  const championshipData = useFetcher();

  const fetchers = useFetchers();
  const isSubmmitting = fetchers.some(
    (fetcher) => fetcher.state === 'submitting',
  );

  const { championships, legacyChampionships } = useLoaderData<typeof loader>();

  for (const legacyChampionship of legacyChampionships) {
    const current = championships.find((c) => c.slug === legacyChampionship.id);
    legacyChampionship.synced = !!current;
  }

  return (
    <div className="p-4 flex flex-col gap-y-8">
      <h2 className="text-2xl font-medium">Datenabgleich</h2>
      <div className="bg-app-subtle rounded-md border border-neutral p-4">
        <Disclosure label="Backend-Daten">
          <div className="py-4 px-2 flex flex-col gap-y-4">
            <p className="text-app-subtle">
              Hiermit werden die Cache-Daten des Backends gelöscht. Damit kann
              die zur Zeit noch laufende Tipprunden-Anwendung wieder aktuelle
              Daten anzeigen.
            </p>
            <p className="text-app-subtle">
              Zur Zeit sind die zu löschenden Routen noch hart codiert. Während
              eines laufenden Turniers ändert sich da auch nicht viel. Es
              könnten neue Teams oder neue Mannschaften dazukommen. Bis Sommer
              sollte das entweder alles obsolet sein oder hier eine
              Auswahlmöglichkeit realisert sein.
            </p>
            <legacyCache.Form action="/action/sync/clear-cache" method="post">
              <Button
                color="primary"
                type="submit"
                isDisabled={legacyCache.state === 'submitting'}
              >
                Cache löschen
              </Button>
            </legacyCache.Form>
          </div>
        </Disclosure>
      </div>
      <masterData.Form method="post" className="flex flex-col gap-y-8">
        <div className="bg-app-subtle rounded-md border border-neutral p-4">
          <Disclosure label="Stammdaten">
            <div className="py-4 px-2 flex flex-col gap-y-4">
              <p className="text-app-subtle">
                Stammdaten sind die unveränderlichen Daten, die in den
                jeweiligen Turnieren benutzt werden: Spieler,
                Mannschaften/Teams, Ligen und Regelwerke. Diese Daten sind
                relativ stabil und ändern sich maximal bei neuen Runden oder
                neuen Turnieren.
              </p>
              <p className="text-app-subtle">
                Solange die Firestore-Datenbank maßgeblich die Daten besitzt,
                müssen - nach Änderungen dieser - die lokalen Daten der
                Anwendung synchronisiert werden.
              </p>
              <div className="flex flex-wrap justify-around">
                <Button
                  isDisabled={isSubmmitting}
                  color="primary"
                  type="submit"
                  name="action"
                  value="players"
                  className="flex gap-x-1 pl-2"
                >
                  <Icon
                    name="lucide/loader"
                    className={clsx(
                      masterData.formData?.get('action') === 'players' &&
                        'animate-spin',
                    )}
                  />
                  Spieler
                </Button>
                <Button
                  isDisabled={isSubmmitting}
                  color="primary"
                  type="submit"
                  name="action"
                  value="teams"
                  className="flex gap-x-1 pl-2"
                >
                  <Icon
                    name="lucide/loader"
                    className={clsx(
                      masterData.formData?.get('action') === 'teams' &&
                        'animate-spin',
                    )}
                  />
                  Teams
                </Button>
                <Button
                  isDisabled={isSubmmitting}
                  color="primary"
                  type="submit"
                  name="action"
                  value="leagues"
                  className="flex gap-x-1 pl-2"
                >
                  <Icon
                    name="lucide/loader"
                    className={clsx(
                      masterData.formData?.get('action') === 'leagues' &&
                        'animate-spin',
                    )}
                  />
                  Ligen
                </Button>
                <Button
                  isDisabled={isSubmmitting}
                  color="primary"
                  type="submit"
                  name="action"
                  value="rulesets"
                  className="flex gap-x-1 pl-2"
                >
                  <Icon
                    name="lucide/loader"
                    className={clsx(
                      masterData.formData?.get('action') === 'rulesets' &&
                        'animate-spin',
                    )}
                  />
                  Regelwerke
                </Button>
              </div>
            </div>
          </Disclosure>
        </div>
      </masterData.Form>

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
                  {lc.synced && lc.completed ? (
                    <span>Keine</span>
                  ) : (
                    <championshipData.Form method="post">
                      <input
                        type="hidden"
                        name="championshipSlug"
                        value={lc.id}
                      />
                      <Button
                        isDisabled={isSubmmitting}
                        color="primary"
                        type="submit"
                        name="action"
                        value="championship"
                        className="flex gap-x-1 pl-2"
                      >
                        <Icon
                          name="lucide/loader"
                          className={clsx(
                            championshipData.formData?.get(
                              'championshipSlug',
                            ) === lc.id && 'animate-spin',
                          )}
                        />
                        Abgleich
                      </Button>
                    </championshipData.Form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
