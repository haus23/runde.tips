import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';

import UI from '#components/ui';
import {
  ensureSignup,
  login,
  requireAnonymous,
} from '#utils/auth/auth.server.ts';

export const handle = {
  pageTitle: 'Boarding',
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  return await ensureSignup(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return login(request);
}

export default function OnboardingRoute() {
  const actionData = useActionData<typeof action>();

  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

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
          validationErrors={actionData?.errors}
        >
          <UI.TextField
            name="code"
            className="flex flex-col items-center"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label="Code"
            isRequired
            maxLength={6}
            pattern="\d{6}"
          >
            <UI.Input className="w-40 text-center text-4xl" />
            <UI.FieldError className="mt-2">
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
