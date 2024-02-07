import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect, useActionData, useSubmit } from '@remix-run/react';
import { findUserByEmail } from '@tipprunde/db';
import { Button, Form, TextField } from '@tipprunde/ui';
import { invariant } from '@tipprunde/utils';
import { auth } from '#utils/auth.server';
import { db } from '#utils/db.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get('email');
  invariant(typeof email === 'string');

  const user = await findUserByEmail(db, email);

  if (user === null) {
    return json({
      errors: {
        email: 'Unbekannte Email-Adresse.',
      },
    });
  }

  await auth.prepareOnboarding(request, { name: user.name, email });
  return redirect('/onboarding');
}

export default function LoginRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const actionData = useActionData<typeof action>();

  return (
    <div className="mt-8 p-4 sm:px-8 flex flex-col gap-y-8 max-w-xl mx-4 rounded-md sm:mx-auto bg-app-stressed sm:rounded-xl">
      <h2 className="text-center text-3xl font-medium">Anmeldung</h2>
      <Form
        className="flex flex-col gap-4"
        method="post"
        onSubmit={onSubmit}
        validationErrors={actionData?.errors}
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
          <Button variant="accent" type="submit">
            Code anfordern
          </Button>
        </div>
      </Form>
    </div>
  );
}
