import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { Divider, NavLink } from '#components/ui';
import { UserMenu } from '#components/user-menu';
import { useIsAuthenticated } from '#utils/auth/user';
import { usePageTitle } from '#utils/foh/use-page-title';

export function Header() {
  const pageTitle = usePageTitle();
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="h-14 bg-app sticky top-0 grid max-w-6xl mx-auto px-2 sm:px-4">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
        <Logo />
        <nav>
          <NavLink href="/">Tabelle</NavLink>
        </nav>
        <div className="flex items-center gap-x-2">
          <ThemeMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-x-2 h-14">
              <Divider orientation="vertical" className="h-10 ml-2" />
              <NavLink href="/login">Log In</NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="grid sm:hidden grid-cols-[auto_1fr_auto] gap-x-2 items-center">
        <h1 className="text-xl">{pageTitle}</h1>
      </div>
    </header>
  );
}
