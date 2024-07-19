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
