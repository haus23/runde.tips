import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableProps extends ComponentPropsWithoutRef<'table'> {}
interface TableHeaderProps extends ComponentPropsWithoutRef<'thead'> {}
interface ColumnProps extends ComponentPropsWithoutRef<'th'> {}
interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {}
interface RowProps extends ComponentPropsWithoutRef<'tr'> {}
interface CellProps extends ComponentPropsWithoutRef<'td'> {}

export function Table({ className, ...props }: TableProps) {
  return <table {...props} className={twMerge('text-sm', className)} />;
}

export function TableHeader<T extends object>({
  className,
  children,
  ...props
}: TableHeaderProps) {
  return (
    <thead {...props}>
      <tr className={twMerge('bg-accent text-xs uppercase', className)}>
        {children}
      </tr>
    </thead>
  );
}

export function Column({ className, ...props }: ColumnProps) {
  return (
    <th scope="col" {...props} className={twMerge('p-2 md:px-6', className)} />
  );
}

export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={twMerge('divide-y divide-default', className)}
    />
  );
}

export function Row({ className, ...props }: RowProps) {
  return <tr {...props} className={className} />;
}

export function Cell({ className, ...props }: CellProps) {
  return <td {...props} className={twMerge('p-2 md:px-6', className)} />;
}
