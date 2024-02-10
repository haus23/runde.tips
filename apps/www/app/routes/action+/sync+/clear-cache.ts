import { json } from '@remix-run/node';

export async function action() {
  // TODO: Get options from request
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"routes":true,"resources":[],"standings":"rr2324"}',
  };

  const invalidationResults = await fetch(
    'https://backend.runde.tips/api/invalidate-cache',
    options,
  ).then((response) => response.json());
  return json({ invalidationResults });
}
