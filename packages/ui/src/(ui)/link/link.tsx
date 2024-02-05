import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../base-styles';

const linkStyles = tv({
  extend: focusRing,
  base: ['px-2 rounded-sm'],
});

const navLinkStyles = tv({
  extend: linkStyles,
  base: ['px-3 py-1.5 rounded-lg hover:bg-cn-hover pressed:bg-cn-active'],
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
  return (
    <Link
      {...props}
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        navLinkStyles({ ...renderProps, className }),
      )}
    />
  );
}

export { _Link as Link, _NavLink as NavLink };
