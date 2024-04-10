import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import clsx from 'clsx';
import { Table, TableBody, TableHeader } from 'react-aria-components';
import { Fragment } from 'react/jsx-runtime';
import {
  Button,
  Cell,
  Column,
  HoverBox,
  HoverBoxContent,
  HoverBoxTrigger,
  Icon,
  Row,
} from '#components/ui';
import { db } from '#utils/db.server';
import { requireChampionship } from '#utils/foh/championships.server';
import { getCurrentTips } from '#utils/foh/current-tips.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  const ranks = await db.player.findMany({
    where: { championshipId: championship.id },
    orderBy: { rank: 'asc' },
    include: { user: true },
  });
  const currentTips = await getCurrentTips(championship);

  return json({ championship, ranks, currentTips });
}

export default function RankingRoute() {
  const { championship, ranks, currentTips } = useLoaderData<typeof loader>();

  return (
    <div className="grid gap-y-4">
      <div className="flex text-xl gap-x-1.5">
        <h1 className="hidden sm:block text-xl font-medium">
          {championship.name}
        </h1>
        <span className="hidden sm:block">-</span>
        <h2 id="tableLabel" className="px-2 sm:px-0 text-xl font-medium">
          {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
        </h2>
      </div>
      <Table className="text-sm font-semibold" aria-labelledby="tableLabel">
        <TableHeader className="bg-accent text-xs uppercase">
          <Column className="py-2 px-2 md:px-6 text-right">Platz</Column>
          <Column className="px-2 md:px-6 text-left" isRowHeader>
            Name
          </Column>
          {championship.extraPointsPublished ? (
            <>
              <Column className="px-2 md:px-6">
                <span className="hidden sm:inline">Zusatzpunkte</span>
                <span className="sm:hidden">Zusatzpkt</span>
              </Column>
              <Column className="px-2 md:px-6">
                <span className="hidden sm:inline">Gesamtpunkte</span>
                <span className="sm:hidden">Gesamt</span>
              </Column>
            </>
          ) : (
            <Column className="px-2 md:px-6">Punkte</Column>
          )}

          {!championship.completed && currentTips.length > 0 && (
            <Column className="text-center px-2">Tipps</Column>
          )}
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
                {championship.extraPointsPublished && (
                  <Cell className="text-center">{player.extraPoints}</Cell>
                )}
                <Cell className="text-center">{player.totalPoints}</Cell>
                {!championship.completed && currentTips.length > 0 && (
                  <Cell className="px-4">
                    <HoverBox>
                      <HoverBoxTrigger>
                        <Button variant="trigger">
                          <Icon
                            className="text-app-subtle"
                            name="lucide/calendar"
                          />
                        </Button>
                      </HoverBoxTrigger>
                      <HoverBoxContent>
                        <div className="grid w-[240px] grid-cols-[1fr_repeat(2,_auto)] pb-2 text-sm">
                          <div className="border-b border-default py-2 pl-2">
                            Spiel
                          </div>
                          <div className="border-b border-default p-2 text-center">
                            Tipp
                          </div>
                          <div className="border-b border-default p-2 text-center">
                            Pkt
                          </div>
                          {currentTips.map((m) => {
                            const tip = m.tips.find(
                              (t) => t.playerId === player.id,
                            );
                            return (
                              <Fragment key={m.id}>
                                <div
                                  className={clsx(
                                    'py-1 pl-2',
                                    (tip?.joker ||
                                      tip?.lonelyHit ||
                                      tip?.extraJoker) &&
                                      'text-accent bg-content',
                                  )}
                                >
                                  {m.hometeam?.shortname}-
                                  {m.awayteam?.shortname}
                                </div>
                                <div
                                  className={clsx(
                                    'py-1 text-center',
                                    (tip?.joker ||
                                      tip?.lonelyHit ||
                                      tip?.extraJoker) &&
                                      'text-accent bg-content',
                                  )}
                                >
                                  {tip?.tip}
                                </div>
                                <div
                                  className={clsx(
                                    'py-1 text-center',
                                    (tip?.joker ||
                                      tip?.lonelyHit ||
                                      tip?.extraJoker) &&
                                      'text-accent bg-content',
                                  )}
                                >
                                  {m.result && tip?.points}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </HoverBoxContent>
                    </HoverBox>
                  </Cell>
                )}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
