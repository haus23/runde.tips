import { ManagerNav } from './manager-nav';

export function Sidebar() {
  return (
    <div>
      <div className="hidden md:flex bg-app-stressed md:fixed md:inset-y-0 md:left-0 md:w-60 md:border-r md:shadow-md border-neutral">
        <ManagerNav />
      </div>
    </div>
  );
}
