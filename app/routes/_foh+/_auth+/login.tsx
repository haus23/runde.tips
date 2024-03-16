import { Form } from 'react-aria-components';
import { Card, CardBody, CardHeader } from '#components/card';
import { Button, Divider, TextField } from '#components/ui';

export const handle = {
  pageTitle: 'Log In',
};

export default function LogInRoute() {
  return (
    <Card className="sm:mt-8">
      <CardHeader asChild>
        <h2>Anmeldung</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form className="flex flex-col gap-y-4">
          <TextField label="Email" />
          <Button variant="solid" color="accent" className="self-start">
            Code anfordern
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
