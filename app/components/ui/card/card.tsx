import type { HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  slots: {
    wrapper: 'rounded-xl bg-content shadow-medium',
    header: 'px-4 py-2 font-medium text-app text-xl md:px-8',
    content: 'p-4 md:px-8',
  },
});

const { wrapper, header, content } = cardStyles();

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
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
