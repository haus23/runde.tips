import { type Params, redirect } from '@remix-run/react';

export async function requireChampionship(params: Params<string>) {
  const { championship: slug } = params;

  if (slug) {
    throw new Response('Not found', {
      status: 404,
    });
  }

  throw redirect('/willkommen');
}
