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
  OverlayArrow,
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
      <OverlayArrow className="group">
        <svg
          role="img"
          aria-label="Kleiner Pfeil"
          width={12}
          height={12}
          viewBox="0 0 12 12"
          className="group-placement-left:-rotate-90 block fill-popover stroke-1 stroke-border-default group-placement-bottom:rotate-180 group-placement-right:rotate-90"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
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
