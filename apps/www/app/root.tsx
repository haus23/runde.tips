import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import type { LinksFunction } from '@remix-run/node';
import './styles/tailwind.css';

import { iconsHref, logoHref } from '@tipprunde/ui';
import { useTheme } from '@tipprunde/utils/theme';

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', href: iconsHref, as: 'image' },
    { rel: 'preload', href: logoHref, as: 'image' },
  ];
};

export default function App() {
  const { colorScheme } = useTheme();
  return (
    <html lang="de" className={colorScheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
