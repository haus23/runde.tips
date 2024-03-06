import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { db } from '#utils/db.server';
import { requireChampionship } from '#utils/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  const ranks = await db.player.findMany({
    where: { championshipId: championship.id },
    orderBy: { rank: 'asc' },
    include: { user: true },
  });

  return json({ championship, ranks });
}

export default function RankingRoute() {
  return (
    <div>
      <h2>Tabelle</h2>
    </div>
  );
}
