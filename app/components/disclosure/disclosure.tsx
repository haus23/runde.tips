import { type ReactNode, useState } from 'react';
import { Icon } from '../icon/icon';

type DisclosureProps = {
  label: string;
  children: ReactNode;
};

export function Disclosure({ label, children }: DisclosureProps) {
  return (
    <details className="[&_svg]:open:-rotate-90">
      <summary className="flex justify-between rounded-t-md bg-cn list-none hover:bg-cn-hover px-4 py-1.5">
        <span className="text-xl font-medium select-none">{label}</span>
        <Icon name="lucide/chevron-left" className="transition-transform" />
      </summary>
      {children}
    </details>
  );
}
