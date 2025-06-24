import { AppSidebar } from './app-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate flex min-h-svh w-full">
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}
