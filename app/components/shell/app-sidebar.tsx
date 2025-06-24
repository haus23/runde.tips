import { useLocation } from 'react-router';
import { FohNavigation } from '~/routes/foh/-nav';
import { HinterhofNavigation } from '~/routes/hinterhof/-nav';
import { Link } from '../ui/link';
import { Logo } from './logo';

export function AppSidebar() {
  const { pathname } = useLocation();
  const Navigation = pathname.startsWith('/hinterhof')
    ? HinterhofNavigation
    : FohNavigation;

  return (
    <div className="group">
      <div className="relative h-svh w-[var(--sidebar-width)]" />
      <div className="fixed inset-y-0 h-svh w-[var(--sidebar-width)] border-r">
        <div className="flex h-full w-full flex-col">
          <div className="p-2">
            <Link to="/" variant="sidenav">
              <Logo className="size-10" />
              <span className="font-medium text-xl">runde.tips</span>
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </div>
  );
}
