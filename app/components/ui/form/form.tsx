import type { FormProps as _FormProps } from 'react-aria-components';
import { Form as _Form } from 'react-aria-components';
import { cva } from '~/utils/cva';

const form = cva({
  base: ['flex flex-col gap-4'],
});

interface FormProps extends _FormProps {}

export function Form({ className, ...props }: FormProps) {
  return <_Form className={form({ className })} {...props} />;
}
