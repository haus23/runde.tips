import { useHover } from '@react-aria/interactions';
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
  DialogTrigger,
  OverlayArrow,
  Provider,
} from 'react-aria-components';
import { Popover } from '../popover/popover';

const HoverBoxContext = createContext<{
  onHoverChange: (isHovering: boolean) => void;
}>(undefined as never);

export function HoverBoxTrigger({ children }: { children: ReactNode }) {
  return children;
}

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
          className="block fill-popover stroke-1 stroke-border-default group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog className="focus:outline-none">
        <div {...hoverProps}>{children}</div>
      </Dialog>
    </Popover>
  );
}

export function HoverBox({ children }: { children: ReactNode }) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const [isOpen, setOpen] = useState(false);

  function onHoverChange(isHovering: boolean) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setOpen(isHovering), 50);
  }

  return (
    <Provider
      values={[
        [ButtonContext, { onHoverChange }],
        [HoverBoxContext, { onHoverChange }],
      ]}
    >
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        {children}
      </DialogTrigger>
    </Provider>
  );
}
