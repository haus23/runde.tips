import { useSubmit } from 'react-router';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form/form';
import { TextField } from '~/components/ui/form/text-field';
import { prepareOnboarding, requireAnonymous } from '~/utils/auth.server';
import type { Route } from './+types/login';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request);
}

export async function action({ request }: Route.ActionArgs) {
  await requireAnonymous(request);
  return await prepareOnboarding(request);
}

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  const submit = useSubmit();

  return (
    <div>
      <title>Anmeldung - runde.tips</title>
      <h1 className="font-medium text-2xl">Anmeldung</h1>
      <div className="mt-8 flex flex-col">
        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            submit(e.currentTarget);
          }}
          validationErrors={actionData?.errors}
        >
          <TextField
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
    </div>
  );
}
