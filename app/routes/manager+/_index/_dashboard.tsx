import type { LoaderFunctionArgs } from '@remix-run/node';
import type { IconName } from '#components/ui/types.js';
import { requireAdmin } from '#utils/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdmin(request);
  return null;
}

const items: {
  title: string;
  description: string;
  background: string;
  route: string;
  icon: IconName;
  visible: () => boolean;
}[] = [
  {
    title: 'Neues Turnier',
    description: 'Starte eine neue Liga-Halbserie oder ein Turnier',
    icon: 'folder',
    background: 'bg-pink-500',
    route: './neues-turnier',
    visible: () => true,
  },
];

export default function DashboardRoute() {
  return <div />;
}
