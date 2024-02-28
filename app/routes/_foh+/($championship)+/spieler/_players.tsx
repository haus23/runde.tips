import { useChampionship } from '#utils/foh/use-championship';

export default function PlayersRoute() {
  const { championship } = useChampionship();
  return (
    <div>
      <h2 className="text-3xl font-medium">Spieler</h2>
    </div>
  );
}
