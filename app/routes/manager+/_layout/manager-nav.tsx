import { Form } from 'react-aria-components';
import { Logo } from '#components/logo';
import UI from '#components/ui';
import { useChampionship } from '#utils/app/manager/use-championship';

export function ManagerNav({ className }: { className?: string }) {
  const { currentChampionship } = useChampionship();

  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="flex flex-col p-2">
        <UI.Link href="/">
          <Logo />
        </UI.Link>
      </div>
      <div className="flex grow flex-col gap-y-2 p-2">
        <UI.NavLink
          href="/manager"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <UI.Icon name="lucide/home">Dashboard</UI.Icon>
        </UI.NavLink>
        {currentChampionship && (
          <>
            <UI.NavLink
              href={`/manager/${currentChampionship.slug}`}
              className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
            >
              <UI.Icon name="lucide/folder">Turnier</UI.Icon>
            </UI.NavLink>
            <UI.NavLink
              href={`/manager/${currentChampionship.slug}/spiele`}
              className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
            >
              <UI.Icon name="lucide/calendar">Spiele</UI.Icon>
            </UI.NavLink>
            <UI.NavLink
              href={`/manager/${currentChampionship.slug}/tipps`}
              className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
            >
              <UI.Icon name="lucide/dices">Tipps</UI.Icon>
            </UI.NavLink>
            <UI.NavLink
              href={`/manager/${currentChampionship.slug}/ergebnisse`}
              className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
            >
              <UI.Icon name="lucide/scale">Ergebnisse</UI.Icon>
            </UI.NavLink>
            <UI.NavLink
              href={`/manager/${currentChampionship.slug}/zusatzpunkte`}
              className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
            >
              <UI.Icon name="lucide/smile-plus">Zusatzpunkte</UI.Icon>
            </UI.NavLink>
          </>
        )}
        <UI.NavLink
          href="/manager/sync"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <UI.Icon name="lucide/folder-sync">Synchronisierung</UI.Icon>
        </UI.NavLink>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="border-default border-b pb-2 pl-5 text-app-notice">
          Stammdaten
        </h3>
        <div className="flex flex-col gap-y-2 p-2">
          <UI.NavLink
            href="/manager/turniere"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <UI.Icon name="lucide/folders">Turniere</UI.Icon>
          </UI.NavLink>
          <UI.NavLink
            href="/manager/spieler"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <UI.Icon name="lucide/users">Spieler</UI.Icon>
          </UI.NavLink>
          <UI.NavLink
            href="/manager/teams"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <UI.Icon name="lucide/shield-half">Teams</UI.Icon>
          </UI.NavLink>
          <UI.NavLink
            href="/manager/ligen"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <UI.Icon name="lucide/trophy">Ligen</UI.Icon>
          </UI.NavLink>
          <UI.NavLink
            href="/manager/regelwerke"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <UI.Icon name="lucide/pilcrow">Regelwerke</UI.Icon>
          </UI.NavLink>
        </div>
        <div className="flex flex-col border-default border-t py-2">
          <Form action="/logout" method="post" className="flex px-2">
            <button
              type="submit"
              className="grow rounded-lg px-3 py-1.5 font-medium text-app-subtle text-sm hover:bg-content-hover hover:text-app focus:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-default"
            >
              <UI.Icon name="lucide/log-out">Log Out</UI.Icon>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
