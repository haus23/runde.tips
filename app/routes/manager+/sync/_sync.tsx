import { useFetcher, useFetchers } from '@remix-run/react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Divider,
} from '#components/ui';

export default function SyncRoot() {
  const cacheData = useFetcher();
  const masterData = useFetcher();

  const fetchers = useFetchers();
  const isSubmmitting = fetchers.some(
    (fetcher) => fetcher.state === 'submitting',
  );

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
    </div>
  );
}
