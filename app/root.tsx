import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from '@remix-run/react';

import { useEffect } from 'react';
import { RouterProvider } from 'react-aria-components';
import { Toaster, toast as showToast } from 'sonner';

import { getUser } from '#utils/auth/auth.server';
import { getToast } from '#utils/toast.server';

import { getHints } from '#utils/theme/client-hints.server';
import { MediaQueryFallback } from '#utils/theme/media-query-fallback';
import { ThemeProvider, useTheme } from '#utils/theme/theme.provider';
import { getSession } from '#utils/theme/theme.server';

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

function AppDocument() {
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
        <AppDocument />
      </ThemeProvider>
    </RouterProvider>
  );
}

function ErrorDocument() {
  const { theme } = useTheme();
  return (
    <html lang="de" className={theme.colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme.colorScheme} />
        <Meta />
        <Links />
      </head>
      <body>
        <p className="mx-4 text-center text-3xl leading-snug [text-wrap:balance]">
          Hoppla, hier stimmt was nicht!
        </p>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const data = useRouteLoaderData<typeof loader>('root');
  return (
    <ThemeProvider
      hints={data?.requestInfo.hints}
      sessionTheme={data?.requestInfo.theme}
      defaultColorScheme="dark"
    >
      <ErrorDocument />
    </ThemeProvider>
  );
}
