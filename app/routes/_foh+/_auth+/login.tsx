import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';
import UI from '#components/ui';
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

export default function LogInRoute() {
  const submit = useSubmit();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(e.currentTarget);
  }

  const loaderData = useLoaderData<typeof loader>();

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
          validationErrors={loaderData.errors}
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
