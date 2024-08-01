import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Form } from '@remix-run/react';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

import { Input } from '#components/ui/input';
import { ensureSignup, login, requireAnonymous } from '#utils/auth/auth.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Code Eingabe - runde.tips' }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  return await ensureSignup(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return await login(request);
}

export default function LoginRoute() {
  return (
    <Card className="mx-2 py-2 lg:mt-8">
      <CardHeader className="px-4 text-2xl sm:px-8">Code-Eingabe</CardHeader>
      <Divider className="my-2" />
      <CardBody className="px-4 text-2xl sm:px-8">
        <Form method="post" className="flex flex-col items-center gap-y-4">
          <Input
            name="code"
            label="Code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            isRequired
            description="Code aus der Email - ist fünf Minuten lang gültig."
            classNames={{
              base: 'flex flex-col items-center',
              innerWrapper: 'h-12',
              inputWrapper: 'w-60',
              input: 'text-center text-4xl',
            }}
          />
          <Button type="submit" color="primary">
            Prüfen
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
