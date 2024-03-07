import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from '@nextui-org/react';

import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, useSubmit } from '@remix-run/react';

import { Form } from 'react-aria-components';
import {
  authenticator,
  commitSession,
  getSession,
} from '#utils/auth/auth.server';

export const handle = {
  pageTitle: 'Log In',
};

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const session = await getSession(request);
  const authError = session.get(authenticator.sessionErrorKey);
  const errors = authError ? { email: authError?.message } : undefined;

  return json(
    { errors },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/onboarding',
    failureRedirect: '/login',
  });
}

export default function LoginRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const loaderData = useLoaderData<typeof loader>();

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader className="flex flex-col">
        <h2 className="text-center text-2xl font-medium">Anmeldung</h2>
      </CardHeader>
      <Divider />
      <CardBody className="p-4">
        <Form className="flex flex-col gap-4" method="post" onSubmit={onSubmit}>
          <Input
            type="email"
            name="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Die in der Tipprunde benutzte Adresse."
            isRequired
            errorMessage={loaderData.errors?.email}
          />
          <div className="flex justify-center">
            <Button type="submit">Code anfordern</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
