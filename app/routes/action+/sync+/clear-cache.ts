import type { ActionFunctionArgs } from '@remix-run/node';
import { requireAdmin } from '#utils/auth/auth.server';
import { jsonWithToast } from '#utils/toast/toast.server';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdmin(request);

  // TODO: Get options from request
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"routes":true,"resources":[],"standings":"em2024"}',
  };

  const invalidationResults = await fetch(
    'https://backend.runde.tips/api/invalidate-cache',
    options,
  ).then((response) => response.json());

  return jsonWithToast(
    { invalidationResults },
    { type: 'success', text: 'Cache-Daten erfolgreich gelöscht.' },
  );
}
