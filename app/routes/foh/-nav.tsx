import { TableIcon, UsersIcon, DicesIcon, SettingsIcon } from "lucide-react";
import { NavLink } from "~/components/ui/link";

export function FohNavigation() {
  return (
    <div className="flex grow flex-col justify-between text-muted">
      <div className="flex flex-col gap-y-4">
        <NavLink to="#">
          <TableIcon className="size-5" />
        </NavLink>
        <NavLink to="#">
          <UsersIcon className="size-5" />
        </NavLink>
        <NavLink to="#">
          <DicesIcon className="size-5" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/hinterhof">
          <SettingsIcon className="size-5" />
        </NavLink>
      </div>
    </div>
  );
}
