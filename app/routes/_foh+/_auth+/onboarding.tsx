import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';
import { Card, CardBody, CardHeader } from '#components/card-legacy';
import { Button, Divider, TextField } from '#components/ui';
import {
  authenticator,
  commitSession,
  getSession,
} from '#utils/auth/auth.server';
import { emitter } from '#utils/emitter.server';

export const handle = {
  pageTitle: 'Boarding',
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (user) {
    emitter.emit('toast', { type: 'success', text: 'Du bist eingeloggt.' });
    throw redirect('/');
  }

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
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/onboarding',
    failureRedirect: '/onboarding',
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
    <Card className="sm:mt-8">
      <CardHeader asChild>
        <h2>Code Eingabe</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form
          className="flex flex-col gap-y-4"
          method="post"
          onSubmit={onSubmit}
          validationErrors={loaderData.errors}
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
          <Button
            variant="solid"
            color="accent"
            className="self-center"
            type="submit"
          >
            Prüfen
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
