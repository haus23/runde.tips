import {
  Await,
  type ClientActionFunctionArgs,
  Form,
  defer,
  json,
  useActionData,
} from '@remix-run/react';
import { Button } from '@tipprunde/ui';
import { Suspense } from 'react';
import { toast } from 'sonner';

export async function action() {
  console.log('Server Action');

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"routes":true,"resources":[],"standings":"rr2324"}',
  };

  const invalidateResult = await fetch(
    'https://backend.runde.tips/api/invalidate-cache',
    options,
  ).then((response) => response.json());
  return json({ invalidateResult });
}

export async function clientAction({
  request,
  serverAction,
}: ClientActionFunctionArgs) {
  const result = serverAction<typeof action>();

  toast.promise(result, {
    loading: 'Cache Daten werden gelöscht...',
    success: (data) =>
      `Daten von ${data.invalidateResult.cleared.length} Routen gelöscht.`,
  });

  return result;
}

export default function SyncRoute() {
  const data = useActionData<typeof action>();
  console.log(data);
  return (
    <div className="p-4 flex flex-col gap-y-8">
      <h2 className="text-2xl font-medium">Datenabgleich</h2>
      <div className="bg-app-subtle rounded-md p-4">
        <h3 className="text-xl font-medium">Backend-Daten</h3>
        <Form method="post">
          <Button variant="accent" type="submit">
            Sync
          </Button>
        </Form>
      </div>
    </div>
  );
}
