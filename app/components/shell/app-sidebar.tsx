import { Link, useLocation } from "react-router";
import { Logo } from "./logo";
import { HinterhofNavigation } from "~/routes/hinterhof/-nav";
import { FohNavigation } from "~/routes/foh/-nav";

export function AppSidebar() {
  const { pathname } = useLocation();
  const Navigation = pathname.startsWith("/hinterhof")
    ? HinterhofNavigation
    : FohNavigation;

  return (
    <div>
      <div className="fixed flex flex-col left-3 py-1 top-3 h-[calc(100vh-1.5rem)] rounded-xl w-16 bg-sidebar">
        <div className="grow flex flex-col gap-y-4 items-center">
          <Link to="/">
            <Logo className="size-10 text-app" />
          </Link>
          <Navigation />
        </div>
      </div>
    </div>
  );
}
