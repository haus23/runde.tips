import { type PressEvent, useHover } from '@react-aria/interactions';
import {
  type ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  ButtonContext,
  Dialog,
  PopoverContext,
  Provider,
} from 'react-aria-components';
import { Popover } from '../popover/popover';

const HoverBoxContext = createContext<{
  onHoverChange: (isHovering: boolean) => void;
}>(undefined as never);

export function HoverBoxContent({ children }: { children: ReactNode }) {
  const { onHoverChange } = useContext(HoverBoxContext);
  const { hoverProps } = useHover({ onHoverChange });

  return (
    <Popover placement="left" isNonModal>
      <Dialog className="focus:outline-none" aria-label="Aktuelle Tips">
        <div {...hoverProps}>{children}</div>
      </Dialog>
    </Popover>
  );
}

export function HoverBox({ children }: { children: ReactNode }) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef(null);

  function onHoverChange(isHovering: boolean) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setOpen(isHovering), 50);
  }

  function onPress(e: PressEvent) {
    setOpen(!isOpen);
  }

  return (
    <Provider
      values={[
        [ButtonContext, { onHoverChange, onPress, ref: triggerRef }],
        [
          PopoverContext,
          {
            isOpen,
            onOpenChange: setOpen,
            triggerRef,
            shouldCloseOnInteractOutside: (elt) => elt !== triggerRef.current,
          },
        ],
        [HoverBoxContext, { onHoverChange }],
      ]}
    >
      {children}
    </Provider>
  );
}
