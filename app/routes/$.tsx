import { GeneralErrorBoundary } from '#components/error-boundary';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export function ErrorBoundary() {
  return <GeneralErrorBoundary />;
}
