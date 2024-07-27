import { type MetaFunction, json } from '@remix-run/node';
import { Button, Card, CardBody, CardHeader, Divider, toast } from 'ui';
import { requireNoChampionships } from '#utils/app/championship.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Willkommen - runde.tips' }];
};

export async function loader() {
  await requireNoChampionships();
  return json(null);
}

export default function WelcomeRoute() {
  return (
    <Card className="mx-2 py-2 md:mt-8">
      <CardHeader className="px-4 text-2xl sm:px-8">
        Marie 23 Tipprunde
      </CardHeader>
      <Divider className="my-2" />
      <CardBody className="flex flex-col gap-y-4 px-4 text-lg sm:px-8">
        <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
        <p className="text-justify">
          Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
          einfach auf die erste Runde, die von der Spielleitung freigeschaltet
          wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
          deiner Stadt.
        </p>
        <div className="mt-4 flex justify-around">
          <Button
            onPress={() =>
              toast(
                'info',
                'This is an info toast with a verly long text',
                'Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen deiner Stadt.',
              )
            }
          >
            Info Toast
          </Button>
          <Button onPress={() => toast('info', 'This is an info toast')}>
            Info Toast
          </Button>
          <Button
            onPress={() =>
              toast(
                'success',
                'This is a success toast',
                'Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen deiner Stadt.',
              )
            }
          >
            Success Toast
          </Button>
          <Button onPress={() => toast('error', 'This is an error toast')}>
            Error Toast
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
