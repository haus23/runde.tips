import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { NavLink } from '#components/ui';
import { usePageTitle } from '#utils/foh/use-page-title';

export function Header() {
  const pageTitle = usePageTitle();

  return (
    <header className="h-14 bg-app sticky top-0 grid max-w-6xl mx-auto px-2 sm:px-4">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
        <Logo />
        <nav>
          <NavLink href="/">Tabelle</NavLink>
        </nav>
        <div className="flex items-center gap-x-2">
          <ThemeMenu />
          <div className="flex items-center gap-x-2">
            <span className="border border-default h-10 ml-2" />
            <NavLink href="/login">Log In</NavLink>
          </div>
        </div>
      </div>
      <div className="grid sm:hidden grid-cols-[auto_1fr_auto] gap-x-2 items-center">
        <h1 className="text-xl">{pageTitle}</h1>
      </div>
    </header>
  );
}
