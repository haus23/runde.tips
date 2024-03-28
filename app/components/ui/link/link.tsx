import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const linkStyles = tv({
  extend: focusRingStyles,
  base: ['rounded-lg'],
});

const navLinkStyles = tv({
  extend: linkStyles,
  base: ['px-2 py-1.5 text-app-subtle transition-colors font-medium'],
  variants: {
    isCurrent: { true: 'text-selected', false: 'hover:text-app' },
  },
});

interface _LinkProps extends LinkProps {
  href: string;
}

function _Link({ className, href, ...props }: _LinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, className }),
      )}
    />
  );
}

function _NavLink({ className, href, ...props }: _LinkProps) {
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

export { _Link as Link, _NavLink as NavLink };
