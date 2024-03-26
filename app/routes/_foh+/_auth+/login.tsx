import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { Form } from 'react-aria-components';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from '#components/ui';
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
    <Card className="sm:mt-8 mx-2">
      <CardHeader className="p-4 text-2xl">
        <h2>Anmeldung</h2>
      </CardHeader>
      <Divider />
      <CardContent className="pb-8">
        <Form
          className="flex flex-col gap-y-4"
          method="post"
          onSubmit={onSubmit}
          validationErrors={loaderData.errors}
        >
          <TextField
            name="email"
            isRequired
            type="email"
            label="E-Mail"
            description="Deine für die Tipprunde genutzte E-Mail Adresse."
            errorMessage={({ validationDetails, validationErrors }) =>
              validationDetails.valueMissing
                ? 'Ohne Email-Adresse geht es nicht.'
                : validationDetails.typeMismatch
                  ? 'Ungültige Email-Adresse.'
                  : validationDetails.customError
                    ? validationErrors.join()
                    : ''
            }
          />
          <Button
            variant="solid"
            color="accent"
            className="self-start"
            type="submit"
          >
            Code anfordern
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
