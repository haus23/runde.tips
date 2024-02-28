import { useChampionship } from '#utils/foh/use-championship';

export default function MatchesRoute() {
  const { championship } = useChampionship();
  return (
    <div>
      <h2 className="text-3xl font-medium">Spiele</h2>
    </div>
  );
}
