export function isEqual(a: object, b: object): boolean {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  if (aIsArray !== bIsArray) {
    return false;
  }

  if (aIsArray && bIsArray) {
    const aArray = a as any[];
    const bArray = b as any[];

    if (aArray.length !== bArray.length) {
      return false;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < aArray.length; i++) {
      if (!isEqual(aArray[i], bArray[i])) {
        return false;
      }
    }
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    // eslint-disable-next-line no-prototype-builtins
    if (!b.hasOwnProperty(key)) {
      return false;
    }
  }

  for (const key of aKeys) {
    const aValue = (a as any)[key];
    const bValue = (b as any)[key];

    if (!isEqual(aValue, bValue)) {
      return false;
    }
  }

  return true;
}
