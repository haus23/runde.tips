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
          <TextField />
          <Button variant="solid" color="accent" className="self-start">
            Code anfordern
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
/*
.shadow-medium {
  --tw-shadow: var(--nextui-box-shadow-medium);
  --tw-shadow-colored: var(--nextui-box-shadow-medium);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)
}
*/
