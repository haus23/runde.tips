import { useLocation, useResolvedPath } from '@remix-run/react';
import {
  Link,
  type LinkProps,
  type LinkRenderProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from '../base-styles';

const linkStyles = tv({
  extend: focusRing,
  base: ['p-1.5 rounded-lg'],
});

const navLinkStyles = tv({
  extend: focusRing,
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
interface _NavLinkRenderProps extends LinkRenderProps {
  isActive: boolean;
}

function _NavLink({ className, href, ...props }: _NavLinkProps) {
  // See: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L1030
  const path = useResolvedPath(href);
  const location = useLocation();

  const isActive = path.pathname === location.pathname;

  return (
    <div className="flex translate-y-1.5 pb-2 px-2 border-b-2 border-transparent has-[[aria-current]]:border-accent">
      <Link
        {...(isActive && { 'aria-current': 'page' })}
        {...props}
        href={href}
        className={composeRenderProps(className, (className, renderProps) =>
          navLinkStyles({ ...renderProps, className }),
        )}
      />
    </div>
  );
}

export { _Link as Link, _NavLink as NavLink };
