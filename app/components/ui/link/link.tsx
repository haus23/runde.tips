import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const navLinkStyles = tv({
  extend: focusRingStyles,
  base: [
    'px-2 py-1.5 rounded-lg text-app-subtle transition-colors font-medium',
  ],
  variants: {
    isCurrent: { true: 'text-accent', false: 'hover:text-app' },
  },
});

interface _NavLinkProps extends LinkProps {
  href: string;
}

function _NavLink({ className, href, ...props }: _NavLinkProps) {
  // See: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L1030
  const path = useResolvedPath(href);
  const location = useLocation();

  const isActive = path.pathname === location.pathname;

  return (
    <Link
      {...(isActive && { 'aria-current': 'page' })}
      {...props}
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        navLinkStyles({ ...renderProps, className }),
      )}
    />
  );
}

export { _NavLink as NavLink };
