import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import { Table } from '#components/(ui)/table/table';
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
    <div className="mt-2">
      <h2 className="text-xl font-medium flex gap-1 mx-2 sm:mx-0">
        <span className="hidden sm:block">{championship.name} -</span>
        Abschlusstabelle
      </h2>
      <Table aria-label={`${championship.name} - Abschlusstabelle`}>
        <TableHeader className="uppercase text-xs font-medium bg-ca text-white">
          <Column className="py-2 pl-4 pr-2 text-right font-medium md:px-6">
            Platz
          </Column>
          <Column className="px-2 text-left font-medium md:px-6" isRowHeader>
            Name
          </Column>
          <Column className="px-2 text-left font-medium md:px-6">
            <span className="hidden sm:inline">Zusatzpunkte</span>
            <span className="sm:hidden">Zusatzpkt</span>
          </Column>
          <Column className="px-2 text-left font-medium md:px-6 last:pr-4">
            <span className="hidden sm:inline">Gesamtpunkte</span>
            <span className="sm:hidden">Gesamt</span>
          </Column>
        </TableHeader>
        <TableBody className="divide-y divide-neutral">
          {ranks.map((r, ix) => {
            const currentRank =
              ix === 0
                ? '1.'
                : r.rank !== ranks[ix - 1]?.rank
                  ? `${r.rank}.`
                  : '';
            return (
              <Row key={r.id}>
                <Cell className="pl-4 pr-2 text-right md:px-6">
                  {currentRank}
                </Cell>
                <Cell className="w-full px-2 py-2 md:px-6 md:py-2.5">
                  {r.user.name}
                </Cell>
                <Cell className="px-2 text-center md:px-6">
                  {r.extraPoints}
                </Cell>
                <Cell className="px-2 text-center md:px-6 last:pr-4">
                  {r.totalPoints}
                </Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
