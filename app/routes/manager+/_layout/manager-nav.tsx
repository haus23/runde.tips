import clsx from 'clsx';
import { Form } from 'react-aria-components';
import { Logo } from '#components/logo';
import { Icon, Link, NavLink } from '#components/ui';

export function ManagerNav({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="flex flex-col p-2">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex grow flex-col gap-y-2 p-2">
        <NavLink
          href="/manager"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/home">Dashboard</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/folder">Turnier</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/spiele"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/calendar">Spiele</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/tipps"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/dices">Tipps</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/ergebnisse"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/scale">Ergebnisse</Icon>
        </NavLink>
        <NavLink
          href="/manager/rr2324/zusatzpunkte"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/smile-plus">Zusatzpunkte</Icon>
        </NavLink>
        <NavLink
          href="/manager/sync"
          className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
        >
          <Icon name="lucide/folder-sync">Synchronisierung</Icon>
        </NavLink>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="border-default border-b pb-2 pl-5 text-app-notice">
          Stammdaten
        </h3>
        <div className="flex flex-col gap-y-2 p-2">
          <NavLink
            href="/manager/turniere"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <Icon name="lucide/folders">Turniere</Icon>
          </NavLink>
          <NavLink
            href="/manager/spieler"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <Icon name="lucide/users">Spieler</Icon>
          </NavLink>
          <NavLink
            href="/manager/teams"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <Icon name="lucide/shield-half">Teams</Icon>
          </NavLink>
          <NavLink
            href="/manager/ligen"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <Icon name="lucide/trophy">Ligen</Icon>
          </NavLink>
          <NavLink
            href="/manager/regelwerke"
            className="text-sm data-[current]:bg-content-active hover:bg-content-hover"
          >
            <Icon name="lucide/pilcrow">Regelwerke</Icon>
          </NavLink>
        </div>
        <div className="flex flex-col border-default border-t py-2">
          <Form action="/logout" method="post" className="flex px-2">
            <button
              type="submit"
              className="grow rounded-lg px-3 py-1.5 font-medium text-app-subtle text-sm hover:bg-content-hover hover:text-app focus:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2 focus-visible:ring-offset-default"
            >
              <Icon name="lucide/log-out">Log Out</Icon>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
