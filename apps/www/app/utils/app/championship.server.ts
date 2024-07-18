import { type Params, redirect } from '@remix-run/react';
import { fakeChampionshipsFlag } from './mock';

export async function requireChampionship(params: Params<string>) {
  const { championship: slug } = params;

  // Faking championships - or not
  if (!fakeChampionshipsFlag) throw redirect('/willkommen');

  // Faking wrong slug
  if (slug && !slug?.startsWith('em')) {
    throw new Response('Not found', {
      status: 404,
    });
  }
}

export async function requireNoChampionships() {
  if (fakeChampionshipsFlag) {
    throw redirect('/');
  }
}
