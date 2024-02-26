import { useChampionship } from '#utils/foh/use-championship';

export default function RankingRoute() {
  const { championship } = useChampionship();
  return (
    <div>
      <h2 className="text-3xl font-medium">{championship.name}</h2>
    </div>
  );
}
