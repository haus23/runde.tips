import { useSubmit } from 'react-router';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form/form';
import { OtpField } from '~/components/ui/form/otp-field';
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

  return (
    <div>
      <title>Kontrolle - runde.tips</title>
      <h1 className="font-medium text-2xl">Kontrolle</h1>
      <Form
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          submit(e.currentTarget);
        }}
        validationErrors={actionData?.errors}
        className="mt-8"
      >
        <OtpField
          name="code"
          label="Code"
          description="Der Anmelde-Code aus der (letzten) Code-Email"
          length={6}
        />
        <div>
          <Button type="submit" variant="primary">
            Code prüfen
          </Button>
        </div>
      </Form>
    </div>
  );
}
