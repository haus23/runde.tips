import { Icon, Link, Logo, NavLink } from '@tipprunde/ui';
import { useUser } from '#app/utils/user';

export function ManagerNav() {
  const user = useUser();

  return (
    <div className="flex flex-col w-full pl-2">
      <Link href="/" className="ml-1.5 py-2">
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
      <div className="flex flex-col">
        <h3 className="pb-2 pl-5 text-app-notice border-b border-b-neutral">
          Stammdaten
        </h3>
        <div className="flex flex-col p-2 gap-y-2">
          <NavLink
            href="/manager/turniere"
            className="data-[current]:bg-app-subtle"
          >
            Turniere
          </NavLink>
          <NavLink
            href="/manager/spieler"
            className="data-[current]:bg-app-subtle"
          >
            Spieler
          </NavLink>
          <NavLink
            href="/manager/teams"
            className="data-[current]:bg-app-subtle"
          >
            Teams
          </NavLink>
          <NavLink
            href="/manager/ligen"
            className="data-[current]:bg-app-subtle"
          >
            Ligen
          </NavLink>
          <NavLink
            href="/manager/regelwerke"
            className="data-[current]:bg-app-subtle"
          >
            Regelwerke
          </NavLink>
        </div>
        <div className="border-t border-neutral flex flex-col py-2">
          <NavLink href="/logout">
            <Icon name="lucide/user">Log Out</Icon>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
