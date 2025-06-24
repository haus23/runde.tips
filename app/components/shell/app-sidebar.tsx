import { useLocation } from "react-router";
import { Logo } from "./logo";
import { HinterhofNavigation } from "~/routes/hinterhof/-nav";
import { FohNavigation } from "~/routes/foh/-nav";
import { Link } from "../ui/link";

export function AppSidebar() {
  const { pathname } = useLocation();
  const Navigation = pathname.startsWith("/hinterhof")
    ? HinterhofNavigation
    : FohNavigation;

  return (
    <div className="">
      <Link to="/">
        <Logo className="size-10" />
        <span>runde.tips</span>
      </Link>
      <Navigation />
    </div>
  );
}
