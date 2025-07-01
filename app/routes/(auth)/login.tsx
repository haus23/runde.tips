import { useSubmit } from 'react-router';
import { Form } from '~/components/ui/form/form';
import { useAppForm } from '~/hooks/app-form';
import { useFormErrors } from '~/hooks/form-errors';
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

  const form = useAppForm({
    defaultValues: { email: loaderData.email || '' },
    onSubmit: async ({ value }) => {
      await submit(value, { method: 'post' });
    },
  });

  const errors = useFormErrors(form, actionData?.errors);

  return (
    <div>
      <title>Anmeldung - runde.tips</title>
      <h1 className="font-medium text-2xl">Anmeldung</h1>
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await form.handleSubmit();
        }}
        validationErrors={errors}
        className="mt-8"
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              isRequired
              type="email"
              label="Email"
              description="Deine Adresse aus der Tipprunde"
              autoComplete="email"
            />
          )}
        </form.AppField>
        <div>
          <form.AppForm>
            <form.Button variant="primary">Code anfordern</form.Button>
          </form.AppForm>
        </div>
      </Form>
    </div>
  );
}
