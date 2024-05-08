import { Checkbox, type CheckboxProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const checkboxStyles = tv({
  extend: focusRingStyles,
  base: 'flex h-5 w-5 items-center justify-center rounded border-2 border-default text-app transition-all duration-150',
  variants: {
    isPressed: {
      true: 'scale-90',
    },
  },
});

const svgStyles = tv({
  base: 'h-3 w-3 fill-none stroke-0 stroke-[var(--grass-9)] transition-all duration-150',
  variants: {
    isSelected: {
      true: 'stroke-[3]',
    },
  },
});

function _Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <Checkbox {...props}>
      {({ isSelected, isFocusVisible, isPressed }) => (
        <>
          <div className={checkboxStyles({ isFocusVisible, isPressed })}>
            <svg
              viewBox="0 0 18 18"
              aria-hidden="true"
              className={svgStyles({ isSelected })}
            >
              <polyline points="1 9 7 14 15 4" />
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}

export { _Checkbox as Checkbox };
