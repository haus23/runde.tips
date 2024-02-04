// Helper to handle readonly arrays
// See: https://fettblog.eu/typescript-array-includes/
export function includes<T extends U, U>(
  coll: ReadonlyArray<T>,
  el: U,
): el is T {
  return coll.includes(el as T);
}
