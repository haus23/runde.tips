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
import {
  MediaQueryFallback,
  ThemeProvider,
  getHints,
  useTheme,
} from '@tipprunde/utils/theme';

import { getUser } from '#app/utils/.server/auth';
import { themeSession } from '#app/utils/.server/sessions';

import './styles/tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await themeSession.getSession(request);
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
