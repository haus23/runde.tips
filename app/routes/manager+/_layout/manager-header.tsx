import { ThemeMenu } from '#components/theme-menu.js';
import { usePageTitle } from '#utils/manager/use-page-title';

export function ManagerHeader() {
  const pageTitle = usePageTitle();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl">{pageTitle}</h1>
      <ThemeMenu />
    </div>
  );
}
