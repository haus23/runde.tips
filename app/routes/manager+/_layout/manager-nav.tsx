import { Link, Link as NavLink } from '@nextui-org/react';
import { Form } from '@remix-run/react';
import { Icon, Logo } from '#components';
import { useUser } from '#utils/auth/user';

export function ManagerNav() {
  const user = useUser();

  return (
    <div className="flex flex-col w-full">
      <Link href="/" className="ml-1.5 py-2 block">
        <Logo />
      </Link>
      <div className="grow flex flex-col p-2 gap-y-2">
        <NavLink href="/manager" className="data-[current]:bg-app-subtle">
          <Icon name="lucide/home">Dashboard</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/"
          className="data-[current]:bg-app-subtle"
        >
          <Icon name="lucide/folder">Turnier</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/spiele"
          className="data-[current]:bg-app-subtle"
        >
          <Icon name="lucide/calendar">Spiele</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/tipps"
          className="data-[current]:bg-app-subtle"
        >
          <Icon name="lucide/dices">Tipps</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/ergebnisse"
          className="data-[current]:bg-app-subtle"
        >
          <Icon name="lucide/scale">Ergebnisse</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/zusatzpunkte"
          className="data-[current]:bg-app-subtle"
        >
          <Icon name="lucide/smile-plus">Zusatzpunkte</Icon>
        </NavLink>
        <NavLink href="/manager/sync" className="data-[current]:bg-app-subtle">
          <Icon name="lucide/folder-sync">Synchronisierung</Icon>
        </NavLink>
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="pb-2 pl-5 text-app-notice border-b border-b-neutral">
          Stammdaten
        </h3>
        <div className="flex flex-col p-2 gap-y-2">
          <NavLink
            href="/manager/turniere"
            className="data-[current]:bg-app-subtle"
          >
            <Icon name="lucide/folders">Turniere</Icon>
          </NavLink>
          <NavLink
            href="/manager/spieler"
            className="data-[current]:bg-app-subtle"
          >
            <Icon name="lucide/users">Spieler</Icon>
          </NavLink>
          <NavLink
            href="/manager/teams"
            className="data-[current]:bg-app-subtle"
          >
            <Icon name="lucide/shield-half">Teams</Icon>
          </NavLink>
          <NavLink
            href="/manager/ligen"
            className="data-[current]:bg-app-subtle"
          >
            <Icon name="lucide/trophy">Ligen</Icon>
          </NavLink>
          <NavLink
            href="/manager/regelwerke"
            className="data-[current]:bg-app-subtle"
          >
            <Icon name="lucide/pilcrow">Regelwerke</Icon>
          </NavLink>
        </div>
        <div className="border-t border-neutral flex flex-col py-2">
          <Form action="/logout" method="post" className="px-2 flex">
            <button
              type="submit"
              className="grow
                focus:outline-none focus-visible:ring-2 ring-offset-2 ring-ca ring-offset-app
                py-1.5 px-3 rounded-lg font-medium text-app-subtle hover:text-accent-stressed-hover
              "
            >
              <Icon name="lucide/user">Log Out</Icon>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
