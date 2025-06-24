import { HomeIcon, LogOutIcon } from 'lucide-react';
import { NavLink } from '~/components/ui/link';

export function HinterhofNavigation() {
  return (
    <div className="flex grow flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <NavLink to="/hinterhof">
          <HomeIcon className="size-5" />
          <span>Dashboard</span>
        </NavLink>
      </div>
      <div>
        <NavLink to="/">
          <LogOutIcon className="size-5" />
          <span>Log Out</span>
        </NavLink>
      </div>
    </div>
  );
}
