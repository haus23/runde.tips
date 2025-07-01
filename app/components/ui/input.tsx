import type { InputProps as _InputProps } from 'react-aria-components';
import { Input as _Input } from 'react-aria-components';
import { cva } from '~/utils/cva';
import { focusVisibleClassName } from './_common';

const input = cva({
  base: [
    'flex w-full min-w-0 border px-3 py-1 text-base md:text-sm',
    focusVisibleClassName,
  ],
});

interface InputProps extends _InputProps {}

export function Input({ className, ...props }: InputProps) {
  return <_Input className={input({ className })} {...props} />;
}
