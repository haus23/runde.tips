import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { pickChildren } from '#components/utils';

type PageTitleProps = ComponentPropsWithoutRef<'h1'>;

export function PageTitle({ children, className, ...props }: PageTitleProps) {
  return (
    <h1
      className={twMerge(
        'text-xl fixed top-0 left-14 h-14 sm:static sm:h-auto flex items-center',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

type PageSubtitleProps = ComponentPropsWithoutRef<'h2'>;

export function PageSubitle({
  children,
  className,
  ...props
}: PageSubtitleProps) {
  return (
    <h2 className={twMerge('text-xl pl-2.5', className)} {...props}>
      {children}
    </h2>
  );
}

type PageContentProps = ComponentPropsWithoutRef<'div'>;

export function PageContent({
  children,
  className,
  ...props
}: PageContentProps) {
  return (
    <div className={twMerge('mt-4', className)} {...props}>
      {children}
    </div>
  );
}

type FohPageProps = ComponentPropsWithoutRef<'div'>;

export function FohPage({ children, className, ...props }: FohPageProps) {
  const [childrenWithoutContent, content] = pickChildren(children, PageContent);

  return (
    <div className={twMerge('', className)} {...props}>
      <header className="flex items-center sm:divide-x-2 sm:divide-neutral gap-x-2.5">
        {childrenWithoutContent}
      </header>
      {content}
    </div>
  );
}
