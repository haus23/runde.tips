export function singleton<Value>(name: string, factory: () => Value) {
  const g = (global as typeof globalThis) && {
    __singletons: {} as Record<typeof name, Value>,
  };
  g.__singletons ??= {};

  let instance = g.__singletons[name];
  if (!instance) {
    instance = g.__singletons[name] = factory();
  }
  return instance;
}
