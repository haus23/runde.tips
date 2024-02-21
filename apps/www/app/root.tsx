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

import { Toaster, toast as showToast } from 'sonner';

import { RouterProvider } from 'react-aria-components';

import { getUser } from '#.server/auth';
import { getHints } from '#.server/client-hints';
import { getSession } from '#.server/theme';
import { getToast } from '#.server/toast';

import { MediaQueryFallback } from '#utils/media-query-fallback';
import { ThemeProvider, useTheme } from '#utils/theme';

import { useEffect } from 'react';
import './styles/tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const user = await getUser(request);
  const { toast, headers } = await getToast(request);

  return json(
    {
      user,
      requestInfo: {
        hints: getHints(request),
        theme: session.get('theme'),
        toast,
      },
    },
    { headers },
  );
}

function App() {
  const { theme } = useTheme();
  const {
    requestInfo: { toast },
  } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      const { type, msg } = toast;
      setTimeout(() => {
        showToast[type](msg);
      }, 0);
    }
  }, [toast]);

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
        <Toaster position="top-right" />
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
