import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { requireChampionship } from '#utils/app/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  return json({ championship });
}

export default function PlayersRoute() {
  return (
    <div>
      <h2 className="font-medium text-xl">Spieler</h2>
    </div>
  );
}
