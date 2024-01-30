import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard - Tipprunde Manager' },
    { name: 'description', content: 'Haus23 Tipprunde Manager' },
  ];
};

export default function DashboardRoute() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
