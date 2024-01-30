import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
};

export default function HomeRoute() {
  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-3xl font-medium">Home</h2>
    </div>
  );
}
