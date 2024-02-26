import { Outlet } from '@remix-run/react';
import { useChampionships } from '#utils/foh/use-championships';

export default function ChampionshipLayout() {
  const championships = useChampionships();

  return championships && championships.length > 0 ? (
    <Outlet />
  ) : (
    <div className="bg-app-subtle sm:rounded-lg p-4 flex flex-col gap-y-4 max-w-3xl mx-auto mt-4 text-lg">
      <h2 className="text-3xl font-medium">Marie 23 Tipprunde</h2>
      <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
      <p>
        Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
        einfach auf die erste Runde, die von der Spielleitung freigeschaltet
        wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
        deiner Stadt.
      </p>
    </div>
  );
}
