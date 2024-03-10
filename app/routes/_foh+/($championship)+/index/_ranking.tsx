import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
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

  return (
    <div className="grid gap-y-4">
      <div className="flex text-xl gap-x-1.5">
        <h1 className="hidden sm:block">{championship.name}</h1>
        <span className="hidden sm:block">-</span>
        <h2 id="tableLabel" className="px-2 sm:px-0 text-xl font-medium">
          Abschlusstabelle
        </h2>
      </div>
      <Table className="text-sm" aria-labelledby="tableLabel">
        <TableHeader className="bg-ca text-xs uppercase">
          <Column className="py-2 px-2 md:px-6 text-right">Platz</Column>
          <Column className="px-2 md:px-6 text-left" isRowHeader>
            Name
          </Column>
          <Column className="px-2 md:px-6">
            <span className="hidden sm:inline">Zusatzpunkte</span>
            <span className="sm:hidden">Zusatzpkt</span>
          </Column>
          <Column className="px-2 md:px-6">
            <span className="hidden sm:inline">Gesamtpunkte</span>
            <span className="sm:hidden">Gesamt</span>
          </Column>
        </TableHeader>
        <TableBody className="divide-y divide-default">
          {ranks.map((player, ix) => {
            const rank =
              ix === 0
                ? '1.'
                : player.rank !== ranks[ix - 1]?.rank
                  ? `${player.rank}.`
                  : '';
            return (
              <Row key={player.id}>
                <Cell className="pr-4 md:px-6 text-right">{rank}</Cell>
                <Cell className="w-full py-2 sm:py-2.5 px-2 md:px-6">
                  {player.user.name}
                </Cell>
                <Cell className="text-center">{player.extraPoints}</Cell>
                <Cell className="text-center">{player.totalPoints}</Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
