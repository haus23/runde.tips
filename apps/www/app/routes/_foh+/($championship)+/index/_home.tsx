import type { MetaFunction } from '@remix-run/node';
import { Logo } from '@tipprunde/ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
};

export default function HomeRoute() {
  return (
    <div>
      <h2 className="text-3xl font-medium">Home</h2>
      <input placeholder="Ein kleiner Test" />
    </div>
  );
}
