import type {
  LinkProps as _LinkProps,
  NavLinkProps as _NavLinkProps,
} from 'react-router';
import { Link as _Link, NavLink as _NavLink } from 'react-router';
import type { VariantProps } from '~/utils/cva';
import { compose, cva } from '~/utils/cva';

const link = cva({
  base: [],
  variants: {
    variant: {
      default: [''],
      sidenav: ['flex items-center gap-1.5'],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const navLink = compose(
  link,
  cva({
    variants: {
      variant: { sidenav: ['aria-[current=page]:underline'] },
    },
  }),
);

interface LinkProps extends _LinkProps, VariantProps<typeof link> {}

export function Link({ className, variant, ...props }: LinkProps) {
  return <_Link className={link({ className, variant })} {...props} />;
}

interface NavLinkProps extends _NavLinkProps, VariantProps<typeof navLink> {}

export function NavLink({ className, variant, ...props }: NavLinkProps) {
  return <_NavLink className={navLink({ className, variant })} {...props} />;
}
