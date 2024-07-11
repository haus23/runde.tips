import type { ReactNode } from 'react';
import {
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Select,
  type SelectProps,
  SelectValue,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Popover } from '../popover/popover';
import { FieldError } from './field-error';
import { Label } from './label';

const selectStyles = tv({
  base: 'group flex',
  variants: {
    orientation: {
      horizontal: 'flex-row items-center gap-2',
      vertical: 'flex-col gap-1.5',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

const selectItemStyles = tv({
  base: 'group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pr-1 pl-3 text-sm outline outline-0 forced-color-adjust-none',
  variants: {
    isFocused: {
      true: 'bg-content-hover forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
  },
});

interface _SelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'>,
    VariantProps<typeof selectStyles> {
  items?: Iterable<T>;
  label?: string;
  children: ReactNode | ((item: T) => ReactNode);
}

function _Select<T extends object>({
  children,
  className,
  items,
  label,
  orientation,
  ...props
}: _SelectProps<T>) {
  return (
    <Select
      className={composeRenderProps(className, (className, renderProps) =>
        selectStyles({ ...renderProps, orientation, className }),
      )}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Button
        variant="select"
        className="border-2 border-transparent group-data-[invalid]:border-error"
      >
        <SelectValue />
        <Icon name="chevrons-up-down" />
      </Button>
      <FieldError />
      <Popover className="min-w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
}

function SelectItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <ListBoxItem {...props} textValue={textValue} className={selectItemStyles}>
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <div className="flex grow items-center justify-between group-selected:text-accent">
          <span>{children}</span>
          {isSelected && <Icon name="check" />}
        </div>
      ))}
    </ListBoxItem>
  );
}

export { _Select as Select, SelectItem };
