import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '#utils/db.server';
import { requireChampionship } from '#utils/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  const ranks = await db.player.findMany({
    where: { championshipId: championship.id },
    orderBy: { rank: 'asc' },
    include: { user: true },
  });

  return json({ championship, ranks });
}

export default function RankingRoute() {
  const { championship, ranks } = useLoaderData<typeof loader>();

  let previousRank = -1;

  return (
    <Table
      aria-label={`Abschlusstabelle der ${championship.name}`}
      removeWrapper
    >
      <TableHeader>
        <TableColumn className="uppercase px-2">Platz</TableColumn>
        <TableColumn className="uppercase px-2" isRowHeader>
          Name
        </TableColumn>
        <TableColumn className="uppercase px-2">
          <span className="hidden sm:inline">Zusatzpunkte</span>
          <span className="sm:hidden">Zusatzpkt</span>
        </TableColumn>
        <TableColumn className="uppercase px-2">
          <span className="hidden sm:inline">Gesamtpunkte</span>
          <span className="sm:hidden">Gesamt</span>
        </TableColumn>
      </TableHeader>
      <TableBody items={ranks}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell className="text-right">
              {item.rank !== previousRank
                ? `${
                    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                    (previousRank = item.rank)
                  }.`
                : ''}
            </TableCell>
            <TableCell className="w-full">{item.user.name}</TableCell>
            <TableCell className="text-center">{item.extraPoints}</TableCell>
            <TableCell className="text-center">{item.totalPoints}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
