export const handle = { pageTitle: 'Spieler' };

import type { User } from '@prisma/client';
import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import UI from '#components/ui';
import type { DataColumn } from '#components/ui/table/data-table.js';
import { queryExecutor } from '#utils/cqrs/query-executor.server.js';

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await queryExecutor.getUsers();
  return json({ users });
}

const columns: DataColumn<User>[] = [
  {
    id: 'name',
    label: 'Name',
    isRowHeader: true,
  },
  {
    id: 'email',
    label: 'Email',
    isRowHeader: false,
  },
];

export default function UsersRoute() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      <UI.DataTable
        columns={columns}
        rows={users}
        onEdit={console.log}
        aria-label="Spieler"
      />
    </div>
  );
}
