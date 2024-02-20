import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, useSubmit } from '@remix-run/react';
import { Button, Form, TextField } from '@tipprunde/ui';

import { authenticator, commitSession, getSession } from '#app/.server/auth';

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
    <div className="mt-8 p-4 sm:px-8 flex flex-col gap-y-8 max-w-xl mx-4 rounded-md sm:mx-auto bg-app-stressed border border-neutral sm:rounded-xl">
      <h2 className="text-center text-2xl font-medium">Anmeldung</h2>
      <Form
        className="flex flex-col gap-4"
        method="post"
        onSubmit={onSubmit}
        validationErrors={loaderData?.errors}
      >
        <TextField
          isRequired
          type="email"
          name="email"
          label="Email"
          placeholder="Die in der Tipprunde benutzte Adresse."
          errorMessage={({ validationErrors, validationDetails }) =>
            validationDetails.valueMissing
              ? 'Ohne Email-Adresse geht es nicht.'
              : validationDetails.typeMismatch
                ? 'Ungültige Email-Adresse.'
                : validationDetails.customError
                  ? validationErrors.join()
                  : ''
          }
        />
        <div className="flex justify-center">
          <Button color="accent" type="submit">
            Code anfordern
          </Button>
        </div>
      </Form>
    </div>
  );
}
