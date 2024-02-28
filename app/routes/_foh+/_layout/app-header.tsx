import { useParams } from '@remix-run/react';
import { Link, Logo, NavLink, ThemeMenu } from '#components';
import { useIsAuthenticated } from '#utils/auth/user';
import { usePublishedChampionships } from '#utils/foh/use-championships';
import { UserMenu } from './user-menu';

export function AppHeader() {
  const isAuthenticated = useIsAuthenticated();
  const championships = usePublishedChampionships();
  const { championship: slug } = useParams();

  const championshipSegment = slug ? `/${slug}` : '';

  return (
    <header className="bg-app fixed inset-x-0 top-0 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="h-14 flex items-center gap-x-4">
          <Link href="/" className="py-0 pl-1 rounded-lg">
            <Logo />
          </Link>
          {championships.length > 0 && (
            <nav className="flex gap-x-2">
              <NavLink href={championshipSegment || '/'}>Tabelle</NavLink>
              <NavLink href={`${championshipSegment}/spieler`}>Spieler</NavLink>
              <NavLink href={`${championshipSegment}/spiele`}>Spiele</NavLink>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center">
              <span className="border border-neutral h-10 mx-2" />
              <NavLink href="/login">Log In</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
