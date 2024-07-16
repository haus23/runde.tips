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
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

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
    <Table {...props} className="w-full">
      <TableHeader>
        <Collection items={columns}>
          {(column) => (
            <Column className="text-left" isRowHeader={column.isRowHeader}>
              {column.label}
            </Column>
          )}
        </Collection>
        <Column className="sr-only">Bearbeiten</Column>
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <Row columns={columns}>
            <Collection items={columns}>
              {(column) => <Cell>{item[column.id] as ReactNode}</Cell>}
            </Collection>
            <Cell className="w-5">
              <Button variant="toolbar" onPress={() => onEdit(item)}>
                <Icon className="h-4 w-4 text-app-subtle" name="pencil" />
              </Button>
            </Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
