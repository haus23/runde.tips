import { Form } from 'react-aria-components';
import { Logo } from '#components/logo';
import { Icon, Link, NavLink } from '#components/ui';

export function Sidebar() {
  return (
    <div className="hidden bg-app-subtle md:overflow-y-auto md:flex md:fixed md:inset-y-0 md:left-0 md:w-52 md:border-r md:shadow-medium border-default">
      <div className="flex flex-col w-full">
        <div className="p-2 flex flex-col">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="grow flex flex-col p-2 gap-y-2">
          <NavLink
            href="/manager"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/home">Dashboard</Icon>
          </NavLink>
          <NavLink
            href="/manager/rr2324/"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/folder">Turnier</Icon>
          </NavLink>
          <NavLink
            href="/manager/rr2324/spiele"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/calendar">Spiele</Icon>
          </NavLink>
          <NavLink
            href="/manager/rr2324/tipps"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/dices">Tipps</Icon>
          </NavLink>
          <NavLink
            href="/manager/rr2324/ergebnisse"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/scale">Ergebnisse</Icon>
          </NavLink>
          <NavLink
            href="/manager/rr2324/zusatzpunkte"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/smile-plus">Zusatzpunkte</Icon>
          </NavLink>
          <NavLink
            href="/manager/sync"
            className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
          >
            <Icon name="lucide/folder-sync">Synchronisierung</Icon>
          </NavLink>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="pb-2 pl-5 text-app-notice border-b border-default">
            Stammdaten
          </h3>
          <div className="flex flex-col p-2 gap-y-2">
            <NavLink
              href="/manager/turniere"
              className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
            >
              <Icon name="lucide/folders">Turniere</Icon>
            </NavLink>
            <NavLink
              href="/manager/spieler"
              className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
            >
              <Icon name="lucide/users">Spieler</Icon>
            </NavLink>
            <NavLink
              href="/manager/teams"
              className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
            >
              <Icon name="lucide/shield-half">Teams</Icon>
            </NavLink>
            <NavLink
              href="/manager/ligen"
              className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
            >
              <Icon name="lucide/trophy">Ligen</Icon>
            </NavLink>
            <NavLink
              href="/manager/regelwerke"
              className="hover:bg-content-hover data-[current]:bg-content-active text-sm"
            >
              <Icon name="lucide/pilcrow">Regelwerke</Icon>
            </NavLink>
          </div>
          <div className="border-t border-default flex flex-col py-2">
            <Form action="/logout" method="post" className="px-2 flex">
              <button
                type="submit"
                className="grow py-1.5 px-3 rounded-lg font-medium text-sm
                  text-app-subtle hover:text-app hover:bg-content-hover
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-default focus-visible:ring-offset-default
                "
              >
                <Icon name="lucide/log-out">Log Out</Icon>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
