import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  type LinkRenderProps,
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
  base: ['px-3 rounded-lg'],
  variants: {
    variant: {
      topnav: 'hover:bg-cn-hover pressed:bg-cn-active',
      sidenav: 'text-app-subtle hover:text-app',
    },
    isCurrent: {
      true: 'text-accent-subtle hover:text-accent-subtle dark:text-accent hover:dark:text-accent',
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

interface _NavLinkProps
  extends LinkProps,
    Pick<VariantProps<typeof navLinkStyles>, 'variant'> {
  href: string;
}

function _NavLink({ className, variant, href, ...props }: _NavLinkProps) {
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
        navLinkStyles({ ...renderProps, variant, className }),
      )}
    />
  );
}

export { _Link as Link, _NavLink as NavLink };
