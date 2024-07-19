import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useNavigate,
} from '@remix-run/react';

import { UIProvider } from 'ui';
import { GeneralErrorBoundary } from '#components/error-boundary';
import { useTheme } from '#utils/theme';
import { getTheme } from '#utils/theme/theme.server';

import './styles.css';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      theme: await getTheme(request),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { effectiveColorScheme } = useTheme();

  return (
    <html
      lang="de"
      className={`${effectiveColorScheme} bg-background text-foreground antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Marie 23 Cottbus Tipprunde" />
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
