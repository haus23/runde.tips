import { Outlet } from '@remix-run/react';
import { Header } from './header';

export default function FohLayout() {
  return (
    <div className="relative isolate min-h-svh w-full">
      <Header />
      <main className="mx-auto mt-2 max-w-4xl pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
