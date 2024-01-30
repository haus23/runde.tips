import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
};

export default function HomeRoute() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
