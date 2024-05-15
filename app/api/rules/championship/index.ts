import type { Championship } from '@prisma/client';
import { db } from '#utils/db.server';

export async function calculateChampionship(championship: Championship) {
  const playersWithTips = await db.player.findMany({
    where: { championshipId: championship.id },
    include: { tips: true },
  });

  for (const player of playersWithTips) {
    const points = player.tips.reduce((sum, t) => sum + t.points, 0);
    const totalPoints = championship.extraPointsPublished
      ? points + player.extraPoints
      : points;
    player.points = points;
    player.totalPoints = totalPoints;
  }

  let currentRank = 1;
  let currentPoints = 0;
  const players = playersWithTips
    .toSorted((a, b) => b.totalPoints - a.totalPoints)
    .map((p, ix) => {
      let rank = currentRank;
      if (p.totalPoints !== currentPoints) {
        rank = ++currentRank;
        currentPoints = p.totalPoints;
      }
      return { ...p, rank, tips: undefined };
    });

  for (const p of players) {
    await db.player.update({ where: { id: p.id }, data: p });
  }
}
