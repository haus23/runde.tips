import { HomeIcon, LogOutIcon } from 'lucide-react';
import { NavLink } from '~/components/ui/link';

export function HinterhofNavigation() {
  return (
    <div className="flex grow flex-col justify-between p-2 px-4 pb-4">
      <div className="flex flex-col gap-y-4">
        <NavLink to="/hinterhof" variant="sidenav">
          <HomeIcon className="size-5" />
          <span>Dashboard</span>
        </NavLink>
      </div>
      <div>
        <NavLink to="/" variant="sidenav">
          <LogOutIcon className="size-5" />
          <span>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
}
