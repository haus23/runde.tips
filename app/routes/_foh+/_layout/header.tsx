import { Logo } from '#components/logo';
import { usePageTitle } from '#utils/foh/use-page-title';

export function Header() {
  const pageTitle = usePageTitle();

  return (
    <header className="h-14 bg-app sticky top-0 grid px-2 sm:px-4">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
        <Logo />
        <nav />
        <div />
      </div>
      <div className="grid sm:hidden grid-cols-[auto_1fr_auto] gap-x-2 items-center">
        <h1 className="text-xl">{pageTitle}</h1>
      </div>
    </header>
  );
}
