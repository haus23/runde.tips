import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { requireChampionship } from '#utils/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  return json({ championship });
}

export default function PlayersRoute() {
  return (
    <div>
      <h2 className="text-xl font-medium">Spieler</h2>
    </div>
  );
}
