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
    <div className="">
      <Link to="/">
        <Logo className="size-10" />
        <span>runde.tips</span>
      </Link>
      <Navigation />
    </div>
  );
}
