import { json, useLoaderData } from '@remix-run/react';
import { findUserByEmail } from '@tipprunde/db';
import { db } from '#utils/db.server';
import { useIsAuthenticated } from '#utils/user';

export function meta() {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
}
export default function HomeRoute() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <h2 className="text-3xl font-medium">
        Hallo {isAuthenticated ? 'User' : 'Unbekannte/r'}
      </h2>
    </div>
  );
}
