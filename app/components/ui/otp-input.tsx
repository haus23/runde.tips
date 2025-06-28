import { cva } from 'cva';
import type { OTPInputProps as _OTPInputProps } from 'input-otp';
import { OTPInput as _OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp';

const otpInput = cva({
  base: 'group flex items-center',
});

const slotClassName = cva({
  base: ['relative w-6 text-3xl'],
});

interface OTPInputProps extends Omit<_OTPInputProps, 'children' | 'maxLength'> {
  length: number;
}

export function OtpInput({ className, length, ...props }: OTPInputProps) {
  return (
    <_OTPInput
      containerClassName={otpInput({ className })}
      pattern={REGEXP_ONLY_DIGITS}
      render={({ slots }) => (
        <div className="flex">
          {slots.map((slot, ix) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: No proper key available
            <div key={ix} className={slotClassName()}>
              <div className="text-center tabular-nums">{slot.char || '_'}</div>
              {slot.hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center ">
                  {/* Caret color is set with border on parent div */}
                  <div className="h-5 w-px animate-caret border" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      maxLength={length}
      {...props}
    />
  );
}
