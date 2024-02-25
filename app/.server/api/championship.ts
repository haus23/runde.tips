import { db } from '#utils/db.server';

export type { Championship } from '@prisma/client';

export async function getPublishedChampionships() {
  return await db.championship.findMany({
    where: { published: true },
    orderBy: { nr: 'desc' },
  });
}
