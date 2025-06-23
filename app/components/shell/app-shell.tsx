import { AppSidebar } from "./app-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate grid grid-cols-[0_1fr] md:grid-cols-[5rem_1fr]">
      <AppSidebar />
      <main>{children}</main>
    </div>
  );
}
