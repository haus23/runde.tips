import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { requireChampionship } from '#utils/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  return json({ championship });
}

export default function MatchesRoute() {
  return (
    <div>
      <h2 className="text-3xl font-medium">Spiele</h2>
    </div>
  );
}
