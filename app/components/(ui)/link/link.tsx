import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const linkStyles = tv({
  extend: focusRingStyles,
  base: ['p-1.5'],
});

const navLinkStyles = tv({
  extend: linkStyles,
  base: [
    'px-3 rounded-lg font-medium text-app-subtle hover:text-accent-stressed-hover',
  ],
  variants: {
    isCurrent: {
      true: 'text-accent-stressed',
      false: '',
    },
  },
});

interface _LinkProps extends LinkProps {}

function _Link({ className, ...props }: _LinkProps) {
  return (
    <Link
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, className }),
      )}
    />
  );
}

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

export { _Link as Link, _NavLink as NavLink };
