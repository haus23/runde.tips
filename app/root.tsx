import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteError,
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

import { Icon, type IconName } from '#components';
import styles from './styles/tailwind.css';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

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
        <LiveReload />
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
  const { pathname } = useLocation();
  const error = useRouteError();
  const { theme } = useTheme();

  let iconName: IconName = 'lucide/angry';

  let errorMsg = 'Hier läuft etwas schief!';
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      iconName = 'lucide/frown';
      errorMsg = 'Da hast du dich aber vertippt ...';
    }
  }
  return (
    <html lang="de" className={theme.colorScheme}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme.colorScheme} />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="h-dvh flex flex-col gap-y-8 items-center justify-center">
          <Icon name={iconName} className="size-40 text-error" />
          <p className="inline-flex text-2xl text-center mx-4 leading-snug">
            {errorMsg}
          </p>
          {pathname === '/' ? (
            <p className="block text-2xl">Bitte Micha informieren!</p>
          ) : (
            <Link
              to="/"
              className="block text-2xl underline underline-offset-4"
            >
              Zur Startseite
            </Link>
          )}
        </div>
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const data = useRouteLoaderData<typeof loader>('root');
  return (
    <ThemeProvider defaultColorScheme="dark">
      <ErrorDocument />
    </ThemeProvider>
  );
}
