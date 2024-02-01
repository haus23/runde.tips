import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';

import type { LoaderFunctionArgs } from '@remix-run/node';
import { themeSession } from '#utils/sessions.server';

import './styles/tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await themeSession.getSession(request.headers.get('Cookie'));

  return json({
    requestInfo: {},
  });
}

function App() {
  const colorScheme = 'dark';

  return (
    <html lang="de" className={colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppRoot() {
  const { requestInfo } = useLoaderData<typeof loader>();

  return <App />;
}
