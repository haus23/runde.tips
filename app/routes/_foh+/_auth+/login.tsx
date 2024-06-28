import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useActionData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';

import UI from '#components/ui';
import { requireAnonymous, signup } from '#utils/auth/auth.server.ts';

export const handle = {
  pageTitle: 'Log In',
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  return json(null);
}

export async function action({ request }: ActionFunctionArgs) {
  return await signup(request);
}

export default function LogInRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const actionData = useActionData<typeof action>();

  return (
    <UI.Card className="mx-2 sm:mt-8">
      <UI.CardHeader className="p-4 text-2xl">
        <h2>Anmeldung</h2>
      </UI.CardHeader>
      <UI.Divider />
      <UI.CardContent className="pb-8">
        <Form
          className="flex flex-col gap-y-4"
          method="post"
          onSubmit={onSubmit}
          validationErrors={actionData?.errors}
        >
          <UI.TextField isRequired name="email" type="email">
            <UI.Label>E-Mail</UI.Label>
            <UI.Input />
            <UI.Description>
              Deine für die Tipprunde genutzte E-Mail Adresse.
            </UI.Description>
            <UI.FieldError />
          </UI.TextField>
          <UI.Button
            variant="solid"
            color="accent"
            className="self-start"
            type="submit"
          >
            Code anfordern
          </UI.Button>
        </Form>
      </UI.CardContent>
    </UI.Card>
  );
}
