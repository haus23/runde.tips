export const handle = { pageTitle: 'Spieler' };

import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { queryExecutor } from '#utils/cqrs/query-executor.server.js';

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await queryExecutor.getUsers();
  return json({});
}

export default function UsersRoute() {
  return <div>Alle Spieler</div>;
}
