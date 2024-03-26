import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  slots: {
    wrapper: 'bg-content rounded-xl shadow-medium',
    header: 'text-xl px-4 py-2 md:px-8',
    content: 'p-4 md:px-8',
  },
});

const { wrapper, header, content } = cardStyles();

export function CardHeader({
  className,
  ...props
}: { children: ReactNode; className?: string; asChild?: boolean }) {
  return <div className={header({ className })} {...props} />;
}
export function CardContent({
  className,
  ...props
}: { children: ReactNode; className?: string }) {
  return <div className={content({ className })} {...props} />;
}

export function Card({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return <div className={wrapper({ className })}>{children}</div>;
}
