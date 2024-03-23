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
    <Component
      className={cx('text-2xl font-medium px-4 sm:px-8', className)}
      {...props}
    />
  );
}
export function CardBody({
  className,
  ...props
}: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx('flex flex-col gap-y-4 px-4 sm:px-8', className)}
      {...props}
    />
  );
}

export function Card({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'bg-card rounded-xl shadow-medium max-w-3xl mx-2 sm:mx-auto grid gap-y-4 pt-4 pb-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
