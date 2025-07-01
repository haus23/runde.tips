import {
  DicesIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  TableIcon,
  UsersIcon,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form/form';
import { NavLink } from '~/components/ui/link';
import { useUser } from '~/hooks/user';

export function FohNavigation() {
  const { isAuthenticated, isManager } = useUser();

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
        {isManager && (
          <NavLink to="/hinterhof" variant="sidenav">
            <SettingsIcon className="size-5" />
            <span>Manager</span>
          </NavLink>
        )}
        {isAuthenticated ? (
          <Form action="/logout" method="post">
            <Button type="submit" variant="sidenav">
              <LogOutIcon className="size-5" />
              <span>Log Out</span>
            </Button>
          </Form>
        ) : (
          <NavLink to="/login" variant="sidenav">
            <LogInIcon className="size-5" />
            <span>Log In</span>
          </NavLink>
        )}
      </div>
    </div>
  );
}
