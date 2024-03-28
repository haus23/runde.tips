import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useRevalidator,
} from '@remix-run/react';

import { type ReactNode, useEffect } from 'react';

import { UIProvider } from '#components/ui';

import { getUser } from '#utils/auth/auth.server';
import { useAuthBroadcast } from '#utils/auth/user';
import { ClientHintsFallback } from '#utils/theme/client-hints-fallback';
import { getHints } from '#utils/theme/client-hints.server';
import { useTheme } from '#utils/theme/theme';
import { getSession } from '#utils/theme/theme.server';
import { getToast } from '#utils/toast/toast.server';
import { Toaster } from '#utils/toast/toaster';

import { GeneralErrorBoundary } from '#components/error-boundary';
import styles from './styles.css?url';
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
        {needsFallback && <ClientHintsFallback />}
        <Meta />
        <Links />
      </head>
      <body className="bg-app text-app">
        <UIProvider>
          {children}
          <Scripts />
          <ScrollRestoration />
        </UIProvider>
      </body>
    </html>
  );
}

export default function AppRoot() {
  useAuthBroadcast();
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
