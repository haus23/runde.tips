import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';
import UI from '#components/ui';
import { requireChampionship } from '#utils/app/foh/championships.server';
import { getCurrentTips } from '#utils/app/foh/current-tips.server';
import { db } from '#utils/db.server';

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
      <div className="flex gap-x-1.5 text-xl">
        <h1 className="hidden font-medium text-xl sm:block">
          {championship.name}
        </h1>
        <span className="hidden sm:block">-</span>
        <h2 id="tableLabel" className="px-2 font-medium text-xl sm:px-0">
          {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
        </h2>
      </div>
      <UI.Table aria-labelledby="tableLabel" className="font-semibold">
        <UI.TableHeader>
          <UI.Column className="text-right">Platz</UI.Column>
          <UI.Column className="text-left">Name</UI.Column>
          {championship.extraPointsPublished ? (
            <>
              <UI.Column>
                <span className="hidden sm:inline">Zusatzpunkte</span>
                <span className="sm:hidden">Zusatzpkt</span>
              </UI.Column>
              <UI.Column>
                <span className="hidden sm:inline">Gesamtpunkte</span>
                <span className="sm:hidden">Gesamt</span>
              </UI.Column>
            </>
          ) : (
            <UI.Column>Punkte</UI.Column>
          )}

          {!championship.completed && currentTips.length > 0 && (
            <UI.Column className="text-center md:px-2">Tipps</UI.Column>
          )}
        </UI.TableHeader>
        <UI.TableBody>
          {ranks.map((player, ix) => {
            const rank =
              ix === 0
                ? '1.'
                : player.rank !== ranks[ix - 1]?.rank
                  ? `${player.rank}.`
                  : '';
            return (
              <UI.Row key={player.id}>
                <UI.Cell className="text-right">{rank}</UI.Cell>
                <UI.Cell className="w-full" role="rowheader">
                  {player.user.name}
                </UI.Cell>
                {championship.extraPointsPublished && (
                  <UI.Cell className="text-center">
                    {player.extraPoints}
                  </UI.Cell>
                )}
                <UI.Cell className="text-center">{player.totalPoints}</UI.Cell>
                {!championship.completed && currentTips.length > 0 && (
                  <UI.Cell>
                    <UI.HoverBox>
                      <UI.Button variant="trigger">
                        <UI.Icon
                          className="text-app-subtle"
                          name="lucide/calendar"
                        />
                      </UI.Button>
                      <UI.HoverBoxContent>
                        <div className="grid w-[248px] grid-cols-[1fr_repeat(2,_auto)] pb-2 text-sm">
                          <div className="col-span-2 border-default border-b py-2 pl-2 font-semibold">
                            Tipps von {player.user.name}
                          </div>
                          <div className="border-default border-b p-2 text-center font-semibold">
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
                                      'bg-content text-accent',
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
                                      'bg-content text-accent',
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
                                      'bg-content text-accent',
                                  )}
                                >
                                  {m.result && tip?.points}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </UI.HoverBoxContent>
                    </UI.HoverBox>
                  </UI.Cell>
                )}
              </UI.Row>
            );
          })}
        </UI.TableBody>
      </UI.Table>
    </div>
  );
}
