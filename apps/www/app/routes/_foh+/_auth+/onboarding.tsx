import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect, useLoaderData, useSubmit } from '@remix-run/react';
import { Button, Form, TextField } from '@tipprunde/ui';
import { authenticator } from '#utils/auth.server';
import { authSessionStorage } from '#utils/sessions.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const session = await authSessionStorage.getSession(
    request.headers.get('cookie'),
  );
  const authEmail = session.get('auth:email');
  const authError = session.get(authenticator.sessionErrorKey);

  if (!authEmail) return redirect('/login');

  const errors = authError ? { code: authError?.message } : undefined;
  return json(
    { errors },
    {
      headers: {
        'set-cookie': await authSessionStorage.commitSession(session),
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
    <div className="mt-8 p-4 sm:px-8 flex flex-col gap-y-4 max-w-xl mx-4 rounded-md sm:mx-auto bg-app-stressed sm:rounded-xl">
      <h2 className="text-center text-2xl font-medium">Code Eingabe</h2>
      <Form
        className="flex flex-col gap-4"
        method="post"
        onSubmit={onSubmit}
        validationErrors={loaderData?.errors}
      >
        <TextField
          type="text"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label="Code"
          isRequired
          pattern="\d{6}"
          maxLength={6}
          className="text-center"
          inputClassName="w-40 self-center text-4xl text-center"
          errorMessage={({ validationErrors, validationDetails }) =>
            validationDetails.valueMissing
              ? 'Ohne Code geht es nicht weiter.'
              : validationDetails.patternMismatch
                ? 'Kein Code. Ein Code hat genau sechs Ziffern.'
                : validationDetails.customError
                  ? validationErrors.join()
                  : ''
          }
        />
        <div className="flex justify-center">
          <Button variant="accent" type="submit">
            Anmelden
          </Button>
        </div>
      </Form>
    </div>
  );
}
