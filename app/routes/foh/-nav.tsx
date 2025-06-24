import { TableIcon, UsersIcon, DicesIcon, SettingsIcon } from "lucide-react";
import { NavLink } from "~/components/ui/link";

export function FohNavigation() {
  return (
    <div className="flex grow flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <NavLink to="#">
          <TableIcon className="size-5" />
          <span>Tabelle</span>
        </NavLink>
        <NavLink to="#">
          <UsersIcon className="size-5" />
          <span>Spieler</span>
        </NavLink>
        <NavLink to="#">
          <DicesIcon className="size-5" />
          <span>Spiele</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-y-4">
        <NavLink to="/hinterhof">
          <SettingsIcon className="size-5" />
          <span>Manager</span>
        </NavLink>
        <NavLink to="#">
          <SettingsIcon className="size-5" />
          <span>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
}
