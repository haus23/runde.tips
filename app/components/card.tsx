import { Slot } from '@radix-ui/react-slot';
import cx from 'clsx';
import type { ReactNode } from 'react';

export function CardHeader({
  className,
  asChild,
  ...props
}: { children: ReactNode; className?: string; asChild?: boolean }) {
  const Component = asChild ? Slot : 'div';
  return (
    <Component className={cx('text-2xl font-medium', className)} {...props} />
  );
}

export function Card({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('bg-card rounded-xl shadow-medium', className)}>
      {children}
    </div>
  );
}
