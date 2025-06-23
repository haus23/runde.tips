import type * as React from "react";
import { Outlet, Scripts, ScrollRestoration } from "react-router";

import stylesHref from "./root.css?url";
import { AppShell } from "./components/shell/app-shell";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="mauvi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={stylesHref} />
      </head>
      <body className="min-h-dvh bg-app text-app">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
