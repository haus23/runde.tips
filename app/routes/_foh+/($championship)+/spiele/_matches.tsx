import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/node';

import { requireChampionship } from '#utils/app/championship.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Spiele - runde.tips' }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  await requireChampionship(params);
  return json(null);
}

export default function RankingRoute() {
  return <h2>Spiele</h2>;
}
