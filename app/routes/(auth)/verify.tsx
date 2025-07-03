import { useSubmit } from 'react-router';
import { Form } from '~/components/ui/form/form';
import { useAppForm } from '~/hooks/app-form';
import {
  ensureOnboardingSession,
  requireAnonymous,
  verifyOnboardingCode,
} from '~/utils/auth.server';
import type { Route } from './+types/verify';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
  await ensureOnboardingSession(request);
}

export async function action({ request }: Route.ActionArgs) {
  await requireAnonymous(request);
  return await verifyOnboardingCode(request);
}

export default function VerifyRoute({ actionData }: Route.ComponentProps) {
  const submit = useSubmit();

  const form = useAppForm({
    defaultValues: { code: '' },
    onSubmit: async ({ value }) => {
      await submit(value, { method: 'post' });
    },
  });

  return (
    <div>
      <title>Kontrolle - runde.tips</title>
      <h1 className="font-medium text-2xl">Kontrolle</h1>
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await submit(e.currentTarget);
        }}
        validationErrors={actionData?.errors}
        className="mt-8"
      >
        <form.AppField name="code">
          {(field) => (
            <field.OtpField
              label="Code"
              description="Der Anmelde-Code aus der (letzten) Code-Email"
              length={6}
            />
          )}
        </form.AppField>

        <div>
          <form.AppForm>
            <form.Button variant="primary">Code prüfen</form.Button>
          </form.AppForm>
        </div>
      </Form>
    </div>
  );
}
