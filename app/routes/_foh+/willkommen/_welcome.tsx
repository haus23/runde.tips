import { redirect } from '@remix-run/react';
import { Card, CardBody, CardHeader } from '#components/card-legacy';
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
    <Card className="sm:mt-8">
      <CardHeader asChild>
        <h2>Marie 23 Tipprunde</h2>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg">
        <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
        <p>
          Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
          einfach auf die erste Runde, die von der Spielleitung freigeschaltet
          wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
          deiner Stadt.
        </p>
      </CardBody>
    </Card>
  );
}
