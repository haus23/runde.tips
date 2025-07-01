/**
 *
 * @param selector Selector to prepend to the classnames
 * @param classNames String with space separated classnames
 * @returns String with all classnames prepended by selector
 */
function prependSelector(selector: string, classNames: string) {
  return classNames
    .split(/\s+/)
    .map((clazz) => `${selector}:${clazz}`)
    .join(' ');
}

// ***
// * Common Focus Styling
// ***
//
const focusVisibleBaseClassName = 'outline-0 outline-focus';
const focusOutlineClassname = 'rounded-xs border-transparent outline-2';

export function outlineClassNameOn(pseudoSelector: string) {
  return `${focusVisibleBaseClassName} ${prependSelector(pseudoSelector, focusOutlineClassname)}`;
}

export const focusVisibleClassName = `${focusVisibleBaseClassName} ${outlineClassNameOn('focus-visible')}`;
