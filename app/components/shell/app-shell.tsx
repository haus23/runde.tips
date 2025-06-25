import { twMerge } from 'tailwind-merge';
import { AppSidebar } from './app-sidebar';

const SIDEBAR_WIDTH = '12rem';

export interface AppShellProps extends React.ComponentProps<'div'> {}

export function AppShell({
  children,
  className,
  style,
  ...props
}: AppShellProps) {
  return (
    <div
      className={twMerge('isolate flex min-h-svh w-full', className)}
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <AppSidebar />
      <main className="relative flex min-h-svh w-full grow flex-col">
        <div className="p-4 pt-3">{children}</div>
      </main>
    </div>
  );
}
