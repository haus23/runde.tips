import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react';

import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { ThemeMenu } from '#components';
import { requireAdmin } from '#utils/auth/auth.server';
import { ManagerNav } from './manager-nav';
import { Sidebar } from './sidebar';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);

  return null;
}

export default function ManagerLayout() {
  return (
    <div className="md:ml-60">
      <Sidebar />
      <Navbar className="md:hidden" position="static">
        <NavbarContent>
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarMenu>
          <ManagerNav />
        </NavbarMenu>
      </Navbar>
      <main>
        <div className="absolute top-2 right-4">
          <ThemeMenu />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
