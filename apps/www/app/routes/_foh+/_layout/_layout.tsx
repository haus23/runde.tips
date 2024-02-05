import { Outlet } from '@remix-run/react';
import { AppHeader } from './app-header';

export default function FohLayout() {
  return (
    <div>
      <AppHeader />
      <main className="mx-auto max-w-5xl pt-16 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
