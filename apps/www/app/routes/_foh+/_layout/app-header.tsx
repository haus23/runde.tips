import { Link, Logo, NavLink } from '@tipprunde/ui';
import { useIsAuthenticated } from '#app/utils/user';
import { ThemeMenu } from './theme-menu';

export function AppHeader() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <header className="bg-app fixed inset-x-0 top-0 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="h-14 flex items-center gap-x-4">
          <Link
            href="/"
            className="py-0 pl-1 rounded-lg hover:bg-cn-hover pressed:bg-cn-active"
          >
            <Logo />
          </Link>
          <nav className="flex gap-x-2">
            <NavLink href="/">Tabelle</NavLink>
            <NavLink href="/spieler">Spieler</NavLink>
            <NavLink href="/spiel">Spiele</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeMenu />
          <div className="flex items-center">
            <span className="border border-neutral h-10 ml-2 mr-2" />
            {isAuthenticated ? (
              <NavLink href="/logout">Log Out</NavLink>
            ) : (
              <NavLink href="/login">Log In</NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
