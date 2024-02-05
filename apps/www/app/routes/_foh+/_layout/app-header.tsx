import { Logo } from '@tipprunde/ui';
import { ThemeMenu } from './theme-menu';

export function AppHeader() {
  return (
    <header className="bg-app fixed inset-x-0 top-0 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="h-14 flex items-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}
