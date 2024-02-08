import type { ActionFunctionArgs } from '@remix-run/node';
import { useActionData, useSubmit } from '@remix-run/react';
import { Button, Form, TextField } from '@tipprunde/ui';
import { invariant } from '@tipprunde/utils';
import { auth } from '#utils/auth.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const code = formData.get('code');
  invariant(typeof code === 'string');

  return auth.login(request, code);
}

export default function OnboardingRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const actionData = useActionData<typeof action>();
  console.log(actionData);
  return (
    <div className="mt-8 p-4 sm:px-8 flex flex-col gap-y-4 max-w-xl mx-4 rounded-md sm:mx-auto bg-app-stressed sm:rounded-xl">
      <h2 className="text-center text-2xl font-medium">Code Eingabe</h2>
      <Form
        className="flex flex-col gap-4"
        method="post"
        onSubmit={onSubmit}
        validationErrors={actionData?.errors}
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
