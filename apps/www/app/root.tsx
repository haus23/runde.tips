import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useNavigate,
  useRevalidator,
} from '@remix-run/react';
import { useEffect } from 'react';

import { UIProvider } from 'ui';
import { GeneralErrorBoundary } from '#components/error-boundary';
import { getUser } from '#utils/auth/auth.server';
import { ClientHintsFallback, cookieName, useTheme } from '#utils/theme';
import { getTheme } from '#utils/theme/theme.server';

import './styles.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const { user, headers: authHeaders } = await getUser(request);

  return json(
    {
      user,
      requestInfo: {
        theme: await getTheme(request),
      },
    },
    {
      headers: authHeaders || undefined,
    },
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const { effectiveColorScheme, mode, needsFallback, theme } = useTheme();
  const themeClass =
    theme.themeColor === 'default'
      ? effectiveColorScheme
      : `${theme.themeColor}-${effectiveColorScheme}`;

  useEffect(() => {
    if (mode === 'client') {
      const handleChange = (ev: MediaQueryListEvent) => {
        if (needsFallback) {
          const colorScheme = window.matchMedia('(prefers-color-scheme: light)')
            .matches
            ? 'light'
            : 'dark';
          document.cookie = `${cookieName}=${colorScheme}; Max-Age=31536000; path=/; SameSite=Lax`;
        }

        revalidate();
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery?.removeEventListener('change', handleChange);
    }
  }, [revalidate, mode, needsFallback]);

  return (
    <html
      lang="de"
      className={`${themeClass} bg-background text-foreground antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Marie 23 Cottbus Tipprunde" />
        {needsFallback && <ClientHintsFallback />}
        <Meta />
        <Links />
      </head>
      <body>
        <UIProvider navigate={navigate}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </UIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
