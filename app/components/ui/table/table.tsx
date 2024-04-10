import {
  Cell,
  type CellProps,
  Column,
  type ColumnProps,
  Row,
  type RowProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';
import { composeTailwindRenderProps } from '../utils';

const columnStyles = tv({
  extend: focusRingStyles,
  base: '',
});

const cellStyles = tv({
  extend: focusRingStyles,
  base: '',
});

const rowStyles = tv({
  extend: focusRingStyles,
  base: '',
});

interface _ColumnProps extends ColumnProps {
  className?: string;
}

function _Column({ className, ...props }: _ColumnProps) {
  return (
    <Column
      {...props}
      className={composeTailwindRenderProps(
        (renderProps) => columnStyles({ ...renderProps }),
        twMerge(className),
      )}
    />
  );
}

interface _CellProps extends CellProps {
  className?: string;
}

function _Cell({ className, ...props }: _CellProps) {
  return (
    <Cell
      {...props}
      className={composeTailwindRenderProps(
        (renderProps) => cellStyles({ ...renderProps }),
        twMerge(className),
      )}
    />
  );
}

interface _RowProps<T> extends RowProps<T> {
  className?: string;
}

function _Row<T extends object>({ className, ...props }: _RowProps<T>) {
  return (
    <Row
      {...props}
      className={composeTailwindRenderProps(
        (renderProps) => rowStyles({ ...renderProps }),
        twMerge(className),
      )}
    />
  );
}

export { _Column as Column, _Cell as Cell, _Row as Row };
