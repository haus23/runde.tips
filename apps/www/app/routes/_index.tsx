import type { MetaFunction } from '@remix-run/node';
import { Card, CardBody, CardHeader, Divider } from 'ui';

export const meta: MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export default function Index() {
  return (
    <>
      <h1 className="p-4 font-semibold text-3xl">runde.tips</h1>
      <Card className="mx-auto mt-4 max-w-4xl py-2">
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
    </>
  );
}
