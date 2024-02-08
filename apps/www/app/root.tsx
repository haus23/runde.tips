import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';

import type { LoaderFunctionArgs } from '@remix-run/node';

import { RouterProvider } from '@tipprunde/ui';

import { getUser } from '#app/.server/auth';
import { getHints } from '#app/.server/client-hints';
import { getSession } from '#app/.server/theme';

import { MediaQueryFallback } from '#app/utils/media-query-fallback';
import { ThemeProvider, useTheme } from '#app/utils/theme';

import './styles/tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const user = await getUser(request);

  return json({
    user,
    requestInfo: {
      hints: getHints(request),
      theme: session.get('theme'),
    },
  });
}

function App() {
  const { theme } = useTheme();

  return (
    <html lang="de" className={theme.colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme.colorScheme} />
        <MediaQueryFallback />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppRoot() {
  const { requestInfo } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <RouterProvider navigate={navigate}>
      <ThemeProvider
        hints={requestInfo.hints}
        sessionTheme={requestInfo.theme}
        themeAction="/action/set-theme"
        mediaQueryFallback
      >
        <App />
      </ThemeProvider>
    </RouterProvider>
  );
}
