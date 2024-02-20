import { type SVGProps } from 'react';

import { tv } from 'tailwind-variants';
import type { IconName } from './icons/name.d.ts';
import iconsHref from './icons/sprite.svg';

export { iconsHref };
export { type IconName };

const icon = tv({
  base: 'size-5 inline self-center',
});

const wrapper = tv({ base: 'flex items-center gap-2' });

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, className, children, ...props }: IconProps) {
  if (children) {
    return (
      <span className={wrapper()}>
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
      className={icon({ className })}
    >
      <use href={`${iconsHref}#${name}`} />
    </svg>
  );
}
