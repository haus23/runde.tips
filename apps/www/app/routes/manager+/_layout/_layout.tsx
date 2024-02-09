import { Outlet } from '@remix-run/react';

export default function ManagerLayout() {
  return (
    <div>
      <h1>Manager</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
