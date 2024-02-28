import { cachified } from '@epic-web/cachified';
import { db } from './db.server';
import { singleton } from './singleton.server';

const cache = singleton('cache', () => new Map());

export function cached<Value>(key: string, fetcher: () => Promise<Value>) {
  return cachified({
    ttl: 2 * 60 * 1000, // 2 minutes
    staleWhileRevalidate: 5 * 60 * 1000, // 5 minutes
    cache,
    key,
    getFreshValue: fetcher,
  });
}
