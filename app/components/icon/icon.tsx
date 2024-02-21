import { type SVGProps } from 'react';

import { twMerge } from 'tailwind-merge';
import type { IconName } from './icons/name.d.ts';
import iconsHref from './icons/sprite.svg';

export { iconsHref };
export { type IconName };

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
      className={twMerge('size-5 inline self-center', className)}
    >
      <use href={`${iconsHref}#${name}`} />
    </svg>
  );
}
