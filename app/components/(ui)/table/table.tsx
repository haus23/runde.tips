import {
  Table,
  type TableProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const tableStyles = tv({ base: '' });

function _Table({ children, className, ...props }: TableProps) {
  return (
    <Table
      className={composeRenderProps(className, (className, renderProps) =>
        tableStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {children}
    </Table>
  );
}

export { _Table as Table };
