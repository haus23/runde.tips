export const singleton = <Value>(
  name: string,
  valueFactory: () => Value,
): Value => {
  const g = (global as typeof globalThis) && {
    __singletons: {} as Record<typeof name, Value>,
  };
  g.__singletons ??= {};

  let instance = g.__singletons[name];
  if (!instance) {
    instance = g.__singletons[name] = valueFactory();
  }
  return instance;
};
