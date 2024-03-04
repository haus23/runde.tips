import {
  Table,
  type TableProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const tableStyles = tv({ base: 'mt-4 w-full text-sm' });

function _Table({ children, className }: TableProps) {
  return (
    <Table
      className={composeRenderProps(className, (className, renderProps) =>
        tableStyles({ ...renderProps, className }),
      )}
    >
      {children}
    </Table>
  );
}

export { _Table as Table };
