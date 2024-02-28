import { redirect } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/foh/championships.server';

export async function loader() {
  const championships = await getPublishedChampionships();

  if (championships.length > 0) {
    return redirect('/');
  }
  return null;
}

export default function WelcomeRoute() {
  return (
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
