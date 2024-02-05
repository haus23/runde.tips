import { json, useLoaderData } from '@remix-run/react';
import { getUserByEmail } from '@tipprunde/db';
import { db } from '#utils/db.server';

export function meta() {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
}

export async function loader() {
  const user = await getUserByEmail(db, 'micha@haus23.net');
  return json({ user });
}

export default function HomeRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="text-3xl font-medium">Hallo {user?.name}</h2>
    </div>
  );
}
