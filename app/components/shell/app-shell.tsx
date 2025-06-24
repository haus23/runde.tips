import { AppSidebar } from './app-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}
