import { type Params, redirect } from '@remix-run/react';
import { cached, invalidate } from '#utils/cache.server';
import { db } from '#utils/db.server';

export function getPublishedChampionships() {
  return cached('publishedChampionships', () => {
    return db.championship.findMany({
      where: { published: true },
      orderBy: { nr: 'desc' },
    });
  });
}

export async function resetPublishedChampionships() {
  await invalidate('publishedChampionships');
}

export async function requireChampionship(params: Params<string>) {
  const { championship: slug } = params;

  const championships = await getPublishedChampionships();

  if (championships.length === 0) {
    throw redirect('/willkommen');
  }

  const championship = slug
    ? championships.find((c) => c.slug === slug)
    : championships.at(0);

  if (!championship) {
    throw new Response('Not found', {
      status: 404,
    });
  }

  return championship;
}
