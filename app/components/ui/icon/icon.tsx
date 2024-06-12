import type { SVGProps } from 'react';

import { twMerge } from 'tailwind-merge';
import type { IconName } from './icons/name.js';
import iconsHref from './icons/sprite.svg';

export { iconsHref };

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, className, children, ...props }: IconProps) {
  if (children) {
    return (
      <span className="flex items-center gap-2">
        <Icon name={name} className={className} {...props} />
        {children}
      </span>
    );
  }
  return (
    <svg
      {...props}
      role="img"
      aria-label={`${name} icon`}
      className={twMerge('inline size-5 self-center', className)}
    >
      <use href={`${iconsHref}#${name}`} />
    </svg>
  );
}
