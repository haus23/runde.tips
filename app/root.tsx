import type * as React from 'react';
import { data, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { AppShell } from '~/components/shell/app-shell';
import type { Route } from './+types/root';
import stylesHref from './root.css?url';
import { getUser } from './utils/auth.server';
import { combineHeaders } from './utils/misc';
import { getServerToast } from './utils/toast.server';

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers: authHeaders } = await getUser(request);
  const { toast, headers: toastHeaders } = await getServerToast(request);

  return data(
    { user, toast },
    { headers: combineHeaders(authHeaders, toastHeaders) },
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={stylesHref} />
      </head>
      <body className="bg-root">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
