import { redirect } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/foh/championships.server';

export const handle = {
  pageTitle: 'Willkommen',
};

export async function loader() {
  const championships = await getPublishedChampionships();

  if (championships.length > 0) {
    return redirect('/');
  }
  return null;
}

export default function WelcomeRoute() {
  return (
    <div className="max-w-3xl mx-2 sm:mx-auto mt-4 p-4 sm:p-8 bg-content rounded-xl shadow-lg grid gap-y-4">
      <div>
        <h2 className="text-2xl font-medium border-b border-default pb-1.5">
          Marie 23 Tipprunde
        </h2>
      </div>
      <div className="flex flex-col gap-y-4 text-lg">
        <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
        <p>
          Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
          einfach auf die erste Runde, die von der Spielleitung freigeschaltet
          wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
          deiner Stadt.
        </p>
      </div>
    </div>
  );
}
