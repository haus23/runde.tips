import type { MetaFunction } from '@remix-run/node';
import { Card, CardBody, CardHeader, Divider } from 'ui';

export const meta: MetaFunction = () => {
  return [{ title: 'Willkommen - runde.tips' }];
};

export default function WelcomeRoute() {
  return (
    <Card className="mx-2 py-2 sm:mt-8">
      <CardHeader className="px-8 text-2xl">Marie 23 Tipprunde</CardHeader>
      <Divider className="my-2" />
      <CardBody className="flex flex-col gap-y-4 px-8 text-lg">
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
