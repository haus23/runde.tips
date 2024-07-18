export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export function ErrorBoundary() {
  return <div>Catch All</div>;
}
