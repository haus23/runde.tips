import { db } from '#.server/db';

export type { Championship } from '@prisma/client';

export async function getPublishedChampionships() {
  return await db.championship.findMany({
    where: { published: true },
    orderBy: { nr: 'desc' },
  });
}
