import type { LoaderFunctionArgs } from '@remix-run/node';
import clsx from 'clsx';
import { Icon } from '#components/ui/icon/icon.js';
import { Link } from '#components/ui/link/link.js';
import type { IconName } from '#components/ui/types.js';
import { requireAdmin } from '#utils/auth/utils.server.js';

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
    icon: 'folder-plus',
    background: 'bg-pink-500',
    route: 'manager/neues-turnier',
    visible: () => true,
  },
];

export default function DashboardRoute() {
  return (
    <ul className="mt-2 grid grid-cols-1 gap-6 py-6 sm:grid-cols-2">
      {items
        .filter((item) => item.visible())
        .map((item) => (
          <li key={item.title} className="sm:only:col-span-2 sm:only:mx-auto">
            <Link
              className="flex gap-x-3 p-2 hover:bg-content-hover"
              href={item.route}
            >
              <div
                className={clsx(
                  'flex size-16 items-center justify-center rounded-lg',
                  item.background,
                )}
              >
                <Icon name={item.icon} />
              </div>
              <div className="flex flex-col">
                <div>
                  <span className="font-semibold">{item.title}</span>
                  <span aria-hidden="true"> &rarr;</span>
                </div>
                <span className="text-app-subtle">{item.description}</span>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
