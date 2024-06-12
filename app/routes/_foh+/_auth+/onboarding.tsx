import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';
import UI from '#components/ui';
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
    <UI.Card className="mx-2 sm:mt-8">
      <UI.CardHeader className="p-4 text-2xl">
        <h2>Code Eingabe</h2>
      </UI.CardHeader>
      <UI.Divider />
      <UI.CardContent className="pb-8">
        <Form
          className="flex flex-col items-center gap-y-4"
          method="post"
          onSubmit={onSubmit}
          validationErrors={loaderData.errors}
        >
          <UI.TextField
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label="Code"
            isRequired
            maxLength={6}
            pattern="\d{6}"
          >
            <UI.Input className="w-40 text-center text-4xl" />
            <UI.FieldError className="mt-2 text-center">
              {({ validationErrors, validationDetails }) =>
                validationDetails.valueMissing
                  ? 'Ohne Code geht es nicht weiter.'
                  : validationDetails.patternMismatch
                    ? 'Kein Code. Ein Code hat genau sechs Ziffern.'
                    : validationDetails.customError
                      ? validationErrors.join()
                      : ''
              }
            </UI.FieldError>
          </UI.TextField>
          <UI.Button variant="solid" color="accent" type="submit">
            Prüfen
          </UI.Button>
        </Form>
      </UI.CardContent>
    </UI.Card>
  );
}
