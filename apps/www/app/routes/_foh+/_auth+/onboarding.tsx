import { Form } from '@remix-run/react';
import { Button, Card, CardBody, CardHeader, Divider, Input } from 'ui';

export default function LoginRoute() {
  return (
    <Card className="mx-2 py-2 lg:mt-8">
      <CardHeader className="px-4 text-2xl sm:px-8">Code-Eingabe</CardHeader>
      <Divider className="my-2" />
      <CardBody className="px-4 text-2xl sm:px-8">
        <Form method="post" className="flex flex-col items-center gap-y-4">
          <Input
            name="code"
            label="Code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            isRequired
            description="Code aus der Email - ist fünf Minuten lang gültig."
            classNames={{
              base: 'flex flex-col items-center',
              innerWrapper: 'h-12',
              inputWrapper: 'w-60',
              input: 'text-center text-4xl',
            }}
          />
          <Button type="submit" color="primary">
            Prüfen
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
