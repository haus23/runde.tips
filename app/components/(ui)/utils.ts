import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

/**
 * Helper to merge tailwind classes with renderProps support w/o variants
 *
 * @param className
 * @param tw
 * @returns renderProps function
 */
export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
