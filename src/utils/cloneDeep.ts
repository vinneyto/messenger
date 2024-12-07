export function cloneDeep<T extends object = object>(
  obj: T,
  hash = new WeakMap(),
): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  // Check for circular references
  if (hash.has(obj)) {
    return hash.get(obj) as T;
  }

  let result: any;

  if (obj instanceof Date) {
    result = new Date(obj.getTime());
  } else if (Array.isArray(obj)) {
    result = [];
    hash.set(obj, result);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeep(obj[i], hash);
    }
  } else if (obj instanceof Map) {
    result = new Map();
    hash.set(obj, result);
    obj.forEach((value, key) => {
      result.set(key, cloneDeep(value, hash));
    });
  } else if (obj instanceof Set) {
    result = new Set();
    hash.set(obj, result);
    obj.forEach((value) => {
      result.add(cloneDeep(value, hash));
    });
  } else if (obj instanceof RegExp) {
    result = new RegExp(obj.source, obj.flags);
  } else {
    result = Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, result);

    const keys = Reflect.ownKeys(obj) as (string | symbol)[];
    for (const key of keys) {
      const desc = Object.getOwnPropertyDescriptor(obj, key as string | symbol);
      if (desc) {
        if (desc.value !== undefined) {
          desc.value = cloneDeep(desc.value, hash);
        }
        Object.defineProperty(result, key, desc);
      }
    }
  }

  return result as T;
}
