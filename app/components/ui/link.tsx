import type {
  LinkProps as _LinkProps,
  NavLinkProps as _NavLinkProps,
} from "react-router";
import { Link as _Link, NavLink as _NavLink } from "react-router";

interface LinkProps extends _LinkProps {}

export function Link({ ...props }: LinkProps) {
  return <_Link {...props} />;
}

interface NavLinkProps extends _NavLinkProps {}

export function NavLink({ ...props }: NavLinkProps) {
  return <_NavLink {...props} />;
}
