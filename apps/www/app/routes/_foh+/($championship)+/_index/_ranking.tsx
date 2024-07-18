import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { requireChampionship } from '#utils/app/championship.server';

export async function loader({ params }: LoaderFunctionArgs) {
  await requireChampionship(params);
  return json(null);
}

export default function RankingRoute() {
  return <h2>Tabelle</h2>;
}
