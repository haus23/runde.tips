import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireChampionship } from '#utils/foh/championships.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championship = await requireChampionship(params);
  return json({ championship });
}

export default function RankingRoute() {
  const { championship } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="text-3xl font-medium">{championship.name}</h2>
    </div>
  );
}
