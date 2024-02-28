import { type Params, redirect } from '@remix-run/react';
import { cached } from '#utils/cache.server';
import { db } from '#utils/db.server';

export function getPublishedChampionships() {
  return cached('publishedChampionships', () => {
    return db.championship.findMany({
      where: { published: true },
      orderBy: { nr: 'desc' },
    });
  });
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
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return championship;
}
