import { Link, type LinkProps } from '@nextui-org/link';
import { useLocation, useResolvedPath } from '@remix-run/react';

function _Link(props: LinkProps) {
  return <Link color="foreground" {...props} />;
}

interface _NavLinkProps extends LinkProps {
  href: string;
}

function _NavLink({ href, ...props }: _NavLinkProps) {
  // See: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L1030
  const path = useResolvedPath(href);
  const location = useLocation();

  const isActive = path.pathname === location.pathname;

  return (
    <_Link
      {...(isActive && { 'aria-current': 'page', color: 'primary' })}
      href={href}
      {...props}
    />
  );
}

export { _Link as Link, _NavLink as NavLink };
