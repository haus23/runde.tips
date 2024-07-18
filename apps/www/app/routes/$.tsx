import { Icon } from '#components/icon';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export function ErrorBoundary() {
  return (
    <div>
      <Icon name="frown" /> Catch All
    </div>
  );
}
