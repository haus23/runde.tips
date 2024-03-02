import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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
  const { championship, ranks } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="text-3xl font-medium">
        {championship.name} - Abschlusstabelle
      </h2>
      <table>
        <thead>
          <tr>
            <td>Platz</td>
            <td>Name</td>
            <td>Zusatzpunkte</td>
            <td>Gesamtpunkte</td>
          </tr>
        </thead>
        <tbody>
          {ranks.map((r) => (
            <tr key={r.id}>
              <td>{r.rank}</td>
              <td>{r.user.name}</td>
              <td>{r.extraPoints}</td>
              <td>{r.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
