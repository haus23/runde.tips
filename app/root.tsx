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
  useRevalidator,
  useRouteError,
} from '@remix-run/react';

import { NextUIProvider as UIProvider } from '@nextui-org/react';

import { type ReactNode, useEffect } from 'react';
import { Toaster, toast as showToast } from 'sonner';

import { getUser } from '#utils/auth/auth.server';
import { getToast } from '#utils/toast.server';

import { Icon, type IconName } from '#components/ui';
import { useAuthBroadcast } from '#utils/auth/user';
import { getHints } from '#utils/theme/client-hints.server';
import { getSession } from '#utils/theme/theme.server';

import { ClientHintsFallback } from '#utils/theme/client-hints-fallback';
import { useTheme } from '#utils/theme/theme';
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

export function Layout({ children }: { children: ReactNode }) {
  const { revalidate } = useRevalidator();
  const { theme, mode, needsFallback } = useTheme();

  useEffect(() => {
    if (mode === 'client') {
      const handleChange = (ev: MediaQueryListEvent) => {
        revalidate();
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery?.removeEventListener('change', handleChange);
    }
  }, [revalidate, mode]);

  return (
    <html lang="de" className={theme.colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content={theme.colorScheme} />
        {needsFallback && <ClientHintsFallback />}
        <Meta />
        <Links />
      </head>
      <body className="text-foreground bg-background">
        {children}
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppRoot() {
  const navigate = useNavigate();

  useAuthBroadcast();

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
    <UIProvider navigate={navigate}>
      <Outlet />
      <Toaster position="top-right" />
    </UIProvider>
  );
}

export function ErrorBoundary() {
  const { pathname } = useLocation();
  const error = useRouteError();

  let iconName: IconName = 'lucide/angry';

  let errorMsg = 'Hier läuft etwas schief!';
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      iconName = 'lucide/frown';
      errorMsg = 'Da hast du dich aber vertippt ...';
    }
  }
  return (
    <div className="h-dvh flex flex-col gap-y-8 items-center justify-center">
      <Icon name={iconName} className="size-40 text-danger-200" />
      <p className="inline-flex text-2xl text-center mx-4 leading-snug">
        {errorMsg}
      </p>
      {pathname === '/' ? (
        <p className="block text-2xl">Bitte Micha informieren!</p>
      ) : (
        <Link to="/" className="block text-2xl underline underline-offset-4">
          Zur Startseite
        </Link>
      )}
    </div>
  );
}
