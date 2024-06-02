import type { Championship } from '@prisma/client';
import { db } from '#utils/db.server';

export async function getCurrentTips(championship: Championship) {
  if (championship.completed) return [];

  const matches = await db.match.findMany({
    where: { championship },
    select: {
      id: true,
      date: true,
      result: true,
      hometeam: {
        select: {
          shortname: true,
        },
      },
      awayteam: {
        select: {
          shortname: true,
        },
      },
      tips: true,
    },
  });

  const sortedByDate = [...matches].sort((a, b) =>
    a.date ? (b.date ? a.date.localeCompare(b.date) : 1) : -1,
  );

  const sortedByPlayed = [
    ...sortedByDate.filter((m) => m.result),
    ...sortedByDate.filter((m) => !m.result),
  ];

  const lastMatchIx = sortedByPlayed.findLastIndex((m) => m.result);
  const currentSliceStart = Math.min(
    Math.max(0, lastMatchIx - 1),
    sortedByPlayed.length - 4,
  );
  const currentMatches = sortedByPlayed.slice(
    currentSliceStart,
    currentSliceStart + 4,
  );

  /*
  const tips = (await getTips(championshipId)) || [];
  const teams = (await getTeams()) || [];

  const sortedByDate = [...matches].sort((a, b) => a.date.localeCompare(b.date));
  const sortedByPlayed = [...sortedByDate.filter((m) => m.result), ...sortedByDate.filter((m) => !m.result)];

  const lastMatchIx = sortedByPlayed.findLastIndex((m) => m.result);

  let currentSliceStart = Math.min(Math.max(0, lastMatchIx - 1), sortedByPlayed.length - 4);
  const currentSlice = sortedByPlayed.slice(currentSliceStart, currentSliceStart + 4);

  const currentTips = currentSlice.map((match) => {
    const tipsPerMatch = new Map(tips.filter((t) => t.matchId === match.id).map((t) => [t.playerId, t]));
    return {
      matchId: match.id,
      hometeam: teams.find((t) => t.id === match.hometeamId)?.shortname,
      awayteam: teams.find((t) => t.id === match.awayteamId)?.shortname,
      result: match.result,
      tips: Object.fromEntries(tipsPerMatch),
    };
  }) satisfies CurrentTips;
*/

  return currentMatches;
}
