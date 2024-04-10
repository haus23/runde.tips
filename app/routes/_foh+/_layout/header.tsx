import { ChampionshipSelect } from '#components/championship-select';
import { Logo } from '#components/logo';
import { ThemeMenu } from '#components/theme-menu';
import { Divider, NavLink } from '#components/ui';
import { UserMenu } from '#components/user-menu';
import { useIsAuthenticated } from '#utils/auth/user';
import { useOptionalChampionship } from '#utils/foh/championship.context';
import { usePublishedChampionships } from '#utils/foh/use-championships';
import { usePageTitle } from '#utils/foh/use-page-title';

export function Header() {
  const pageTitle = usePageTitle();
  const isAuthenticated = useIsAuthenticated();
  const championships = usePublishedChampionships();
  const championship = useOptionalChampionship();

  const championshipSegment =
    (championship?.id === championships[0]?.id ? '' : championship?.slug) || '';

  return (
    <header className="h-14 bg-app sticky top-0 grid max-w-6xl mx-auto px-2 sm:px-4">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
        <Logo />
        <nav>
          {championships.length > 0 ? (
            <NavLink href={`/${championshipSegment}`}>Tabelle</NavLink>
          ) : (
            <NavLink href="/">Startseite</NavLink>
          )}
        </nav>
        <div className="flex items-center gap-x-2">
          {championships.length > 1 && <ChampionshipSelect />}
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
        <h1 className="text-xl font-medium">{pageTitle}</h1>
      </div>
    </header>
  );
}
