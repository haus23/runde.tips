import { ManagerNav } from './manager-nav';

export function Sidebar() {
  return (
    <div className="hidden bg-app-stressed md:overflow-y-auto md:flex md:fixed md:inset-y-0 md:left-0 md:w-60 md:border-r md:shadow-md border-neutral">
      <ManagerNav />
    </div>
  );
}
