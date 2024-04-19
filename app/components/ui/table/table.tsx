import {
  Cell,
  type CellProps,
  Column,
  type ColumnProps,
  Row,
  type RowProps,
  Table,
  TableBody,
  type TableBodyProps,
  TableHeader,
  type TableHeaderProps,
  type TableProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const tableStyles = tv({
  base: 'text-sm',
});

const tableHeaderStyles = tv({
  base: 'bg-accent text-xs uppercase',
});

const tableBodyStyles = tv({
  base: 'divide-y divide-default',
});

const columnStyles = tv({
  extend: focusRingStyles,
  base: 'p-2 md:px-6',
});

const cellStyles = tv({
  extend: focusRingStyles,
  base: 'p-2 md:px-6',
});

const rowStyles = tv({
  extend: focusRingStyles,
  base: '',
});

function _Table({ className, ...props }: TableProps) {
  return (
    <Table
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tableStyles({ ...renderProps, className }),
      )}
    />
  );
}

function _TableHeader<T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) {
  return (
    <TableHeader {...props} className={tableHeaderStyles({ className })} />
  );
}

function _Column({ className, ...props }: ColumnProps) {
  return (
    <Column
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        columnStyles({ ...renderProps, className }),
      )}
    />
  );
}

function _TableBody<T extends object>({
  className,
  ...props
}: TableBodyProps<T>) {
  return (
    <TableBody
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tableBodyStyles({ ...renderProps, className }),
      )}
    />
  );
}

function _Cell({ className, ...props }: CellProps) {
  return (
    <Cell
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        cellStyles({ ...renderProps, className }),
      )}
    />
  );
}

function _Row<T extends object>({ className, ...props }: RowProps<T>) {
  return (
    <Row
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        rowStyles({ ...renderProps, className }),
      )}
    />
  );
}

export {
  _Table as Table,
  _TableHeader as TableHeader,
  _TableBody as TableBody,
  _Column as Column,
  _Cell as Cell,
  _Row as Row,
};
