import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import {
  ToggleButton,
  ToggleButtonContext,
  type ToggleButtonProps,
  composeRenderProps,
  useContextProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';
import { cardStyles } from '../card/card';
import { Icon } from '../icon/icon';
import { pickChildren } from '../utils';

export const collapsibleStyles = tv({
  extend: cardStyles,
  slots: {
    header: [
      focusRingStyles.base,
      'group [&_svg]:selected:-rotate-90 flex w-full cursor-default items-center justify-between rounded-t-xl hover:bg-content-hover',
    ],
  },
  variants: {
    isSelected: {
      true: {
        header: 'rounded-b-none',
      },
      false: {
        header: 'rounded-b-xl',
      },
    },
    isFocusVisible: {
      true: {
        header: focusRingStyles.variants.isFocusVisible.true,
      },
    },
  },
});

const { wrapper, header, content } = collapsibleStyles();

interface CollapsibleTriggerProps extends ToggleButtonProps {
  children: ReactNode;
}

export function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <ToggleButton
      className={composeRenderProps(className, (className, renderProps) =>
        header({ ...renderProps, className }),
      )}
      {...props}
    >
      <>
        <span>{children}</span>
        <Icon name="chevron-left" className="transition-transform" />
      </>
    </ToggleButton>
  );
}

export function CollapsibleContent({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  const [props] = useContextProps(
    { isSelected: undefined },
    null,
    ToggleButtonContext,
  );

  return (
    <div className={content({ ...props, className })}>
      {props.isSelected && children}
    </div>
  );
}

interface CollapsibleProps {
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}

export function Collapsible({
  children,
  className,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isSelected, setSelected] = useState(defaultOpen);
  const [content, trigger] = pickChildren(children, CollapsibleTrigger);

  return (
    <div className={wrapper({ className })}>
      <ToggleButtonContext.Provider
        value={{ isSelected, onChange: setSelected }}
      >
        {trigger}
        <div className={clsx(isSelected ? 'block' : 'hidden')}>{content}</div>
      </ToggleButtonContext.Provider>
    </div>
  );
}
