import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Input,
} from 'ui';
import { signup } from '#utils/auth/auth.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Anmeldung - runde.tips' }];
};

export async function action({ request }: ActionFunctionArgs) {
  return await signup(request);
}

export default function LoginRoute() {
  const data = useActionData<typeof action>();

  return (
    <Card className="mx-2 py-2 lg:mt-8">
      <CardHeader className="px-4 text-2xl sm:px-8">Anmeldung</CardHeader>
      <Divider className="my-2" />
      <CardBody className="px-4 text-2xl sm:px-8">
        <Form method="post" className="flex flex-col gap-y-4">
          <Input
            name="email"
            label="Email"
            isRequired
            errorMessage={data?.errors?.email}
            description="Deine für die Tipprunde genutzte E-Mail Adresse."
          />
          <Checkbox name="rememberMe" value="rememberMe" radius="sm">
            Angemeldet bleiben
          </Checkbox>
          <Button type="submit" color="primary" className="mt-2 self-start">
            Code anfordern
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
