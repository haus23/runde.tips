import { redirect } from '@remix-run/react';
import { Card, CardHeader } from '#components/card';
import { Divider } from '#components/ui';
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
    <Card className="max-w-3xl mx-2 sm:mx-auto sm:mt-8 grid gap-y-4 pt-4 pb-8">
      <CardHeader className="px-4 sm:px-8" asChild>
        <h2>Marie 23 Tipprunde</h2>
      </CardHeader>
      <Divider />
      <div className="flex flex-col gap-y-4 text-lg px-4 sm:px-8">
        <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
        <p>
          Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
          einfach auf die erste Runde, die von der Spielleitung freigeschaltet
          wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
          deiner Stadt.
        </p>
      </div>
    </Card>
  );
}
