import { Link, Logo, NavLink } from '@tipprunde/ui';
import { ThemeMenu } from './theme-menu';

export function AppHeader() {
  return (
    <header className="bg-app fixed inset-x-0 top-0 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="h-14 flex items-center">
          <Link href="/" className="pl-1">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeMenu />
          <div className="flex items-center">
            <span className="border border-neutral h-10 ml-2 mr-4" />
            <NavLink href="/login">Log In</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
