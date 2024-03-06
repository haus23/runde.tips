import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from '@nextui-org/react';

import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect, useLoaderData, useSubmit } from '@remix-run/react';

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
  const authEmail = session.get('auth:email');
  const authError = session.get(authenticator.sessionErrorKey);

  if (!authEmail) return redirect('/login');

  const errors = authError ? { code: authError?.message } : undefined;
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
  const url = new URL(request.url);
  const currentPath = url.pathname;

  await authenticator.authenticate('TOTP', request, {
    successRedirect: currentPath,
    failureRedirect: currentPath,
  });
}

export default function OnboardingRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const loaderData = useLoaderData<typeof loader>();

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader className="flex flex-col">
        <h2 className="text-center text-2xl font-medium">Code Eingabe</h2>
      </CardHeader>
      <Divider />
      <CardBody className="p-4">
        <Form className="flex flex-col gap-4" method="post" onSubmit={onSubmit}>
          <Input
            className="w-40 self-center"
            classNames={{
              inputWrapper: 'h-unit-14',
              input: 'text-4xl text-center',
            }}
            type="text"
            name="code"
            aria-label="Code"
            inputMode="numeric"
            autoComplete="one-time-code"
            isRequired
            pattern="\d{6}"
            maxLength={6}
            errorMessage={loaderData.errors?.code}
          />
          <div className="flex justify-center">
            <Button type="submit">Anmelden</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
