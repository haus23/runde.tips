import { useSubmit } from 'react-router';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form/form';
import { TextField } from '~/components/ui/form/text-field';
import {
  prepareOnboarding,
  requireAnonymous,
  restoreLastAuthSession,
} from '~/utils/auth.server';
import type { Route } from './+types/login';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  return await restoreLastAuthSession(request);
}

export async function action({ request }: Route.ActionArgs) {
  await requireAnonymous(request);
  return await prepareOnboarding(request);
}

export default function LoginRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const submit = useSubmit();

  return (
    <div>
      <title>Anmeldung - runde.tips</title>
      <h1 className="font-medium text-2xl">Anmeldung</h1>
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await submit(e.currentTarget);
        }}
        validationErrors={actionData?.errors}
        className="mt-8"
      >
        <TextField
          defaultValue={loaderData.email || ''}
          label="Email"
          name="email"
          autoComplete="email"
          type="email"
          isRequired
          description="Deine Adresse aus der Tipprunde"
        />
        <div>
          <Button type="submit" variant="primary">
            Code anfordern
          </Button>
        </div>
      </Form>
    </div>
  );
}
