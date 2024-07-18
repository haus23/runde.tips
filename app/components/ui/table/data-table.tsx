import type { ReactNode } from 'react';
import {
  Cell,
  Collection,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  type TableProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const rowStyles = tv({
  base: 'rounded-md py-2',
  extend: focusRingStyles,
  variants: {
    isSelected: {
      true: 'bg-content-active',
    },
    isHovered: {
      true: 'bg-content-hover',
    },
  },
});

export type DataColumn<T extends object> = {
  id: keyof T;
  label: string;
  isRowHeader?: boolean;
  fill?: boolean;
};

interface DataTableProps<T extends object> extends TableProps {
  columns: Array<DataColumn<T>>;
  rows: Iterable<T>;
  onEdit: (item: T) => void;
}
export function DataTable<T extends object>({
  columns,
  rows,
  onEdit,
  ...props
}: DataTableProps<T>) {
  return (
    <Table
      {...props}
      className="w-full border-spacing-y-2"
      selectionMode="single"
    >
      <TableHeader className="bg-accent text-xs uppercase">
        <Collection items={columns}>
          {(column) => (
            <Column
              className="p-2 text-left md:px-6"
              isRowHeader={column.isRowHeader}
            >
              {column.label}
            </Column>
          )}
        </Collection>
      </TableHeader>
      <TableBody items={rows} className="divide-y divide-default">
        {(item) => (
          <Row columns={columns} className={rowStyles}>
            <Collection items={columns}>
              {(column) => (
                <Cell className={'p-2 md:px-6'}>
                  {item[column.id] as ReactNode}
                </Cell>
              )}
            </Collection>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
