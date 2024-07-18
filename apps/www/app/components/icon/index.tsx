import { tv } from 'ui';
import type { IconName } from './icons/names.d.ts';
import iconsHref from './icons/sprite.svg';

export { iconsHref };

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const iconStyles = tv({
  base: 'inline size-5 self-center',
});

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
      className={iconStyles({ className })}
    >
      <use href={`${iconsHref}#${name}`} />
    </svg>
  );
}
