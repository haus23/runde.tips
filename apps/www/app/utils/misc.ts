/**
 * Helper to handle readonly arrays
 * See: https://fettblog.eu/typescript-array-includes/
 *
 * @param coll Readonly array of values
 * @param el Value to test
 * @returns true if el was found in coll
 */
export function includes<T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U,
): el is T {
  return coll.includes(el as T);
}

/**
 * Provide a condition and if that condition is falsy, throws an error
 * with the given message.
 *
 * @param condition The condition to check
 * @param message The optional message to throw
 *
 * @throws {Error} if condition is falsy
 */
export function invariant(
  condition: unknown,
  message?: string,
): asserts condition {
  if (!condition) {
    throw new Error(message || 'Unexpected falsy invariant assertion');
  }
}
