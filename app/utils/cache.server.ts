import { cachified } from '@epic-web/cachified';
import { db } from './db.server';
import { singleton } from './singleton.server';

const cache = singleton('cache', () => new Map());

export function getChampionships() {
  return cachified({
    ttl: 2 * 60 * 1000, // 2 minutes
    staleWhileRevalidate: 5 * 60 * 1000, // 5 minutes
    cache,
    key: 'championships',
    async getFreshValue() {
      return await db.championship.findMany({ orderBy: { nr: 'desc' } });
    },
  });
}

export async function getPublishedChampionships() {
  const championships = await getChampionships();
  return championships.filter((c) => c.published);
}
