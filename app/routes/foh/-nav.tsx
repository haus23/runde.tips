import {
  DicesIcon,
  LogInIcon,
  SettingsIcon,
  TableIcon,
  UsersIcon,
} from 'lucide-react';
import { NavLink } from '~/components/ui/link';

export function FohNavigation() {
  return (
    <div className="flex grow flex-col justify-between p-2 px-4 pb-4">
      <div className="flex flex-col gap-y-4">
        <NavLink to="/" variant="sidenav">
          <TableIcon className="size-5" />
          <span>Tabelle</span>
        </NavLink>
        <NavLink to="/spieler" variant="sidenav">
          <UsersIcon className="size-5" />
          <span>Spieler</span>
        </NavLink>
        <NavLink to="/spiele" variant="sidenav">
          <DicesIcon className="size-5" />
          <span>Spiele</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-y-4">
        <NavLink to="/hinterhof" variant="sidenav">
          <SettingsIcon className="size-5" />
          <span>Manager</span>
        </NavLink>
        <NavLink to="/login" variant="sidenav">
          <LogInIcon className="size-5" />
          <span>Log In</span>
        </NavLink>
      </div>
    </div>
  );
}
