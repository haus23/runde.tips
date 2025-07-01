import { cva } from 'cva';
import type { OTPInputProps as _OTPInputProps } from 'input-otp';
import { OTPInput as _OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRef } from 'react';
import { InputContext, useContextProps } from 'react-aria-components';
import { outlineClassNameOn } from './_common';

const containerClassName = cva({
  base: [
    'group flex w-40 justify-center',
    'border',
    outlineClassNameOn('has-[:focus]'),
  ],
});

const slotClassName = cva({
  base: ['relative w-6 text-3xl'],
});

interface OTPInputProps
  extends Omit<
    _OTPInputProps,
    'children' | 'maxLength' | 'defaultValue' | 'onChange'
  > {
  length: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// Basic wrapper of OtpInput. Not very generic but works in my context

export function OtpInput({ className, length, ...props }: OTPInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [mergedProps, mergedRef] = useContextProps(props, ref, InputContext);
  const { onChange, ...otpInputProps } = mergedProps;

  // Hack: Delegate to the React.ChangeEventHandler
  function handleChange(value: string) {
    onChange?.({ target: { value } } as never);
  }

  return (
    <_OTPInput
      ref={mergedRef}
      containerClassName={containerClassName({ className })}
      onChange={handleChange}
      {...otpInputProps}
      tabIndex={0}
      autoComplete="one-time-code"
      pattern={REGEXP_ONLY_DIGITS}
      maxLength={length}
      render={({ slots }) => (
        <div className="flex">
          {slots.map((slot, ix) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: No proper key available
            <div key={ix} className={slotClassName()}>
              <div className="text-center tabular-nums">{slot.char || '_'}</div>
              {slot.hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {/* Caret color is set with border color on parent div */}
                  <div className="h-5 w-px animate-caret border" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    />
  );
}
