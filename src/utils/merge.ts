type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result: Indexed = { ...lhs };

  for (const key in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(key)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      typeof rhs[key] === 'object' &&
      rhs[key] !== null &&
      !Array.isArray(rhs[key])
    ) {
      result[key] =
        key in lhs
          ? merge(lhs[key] as Indexed, rhs[key] as Indexed)
          : merge({}, rhs[key] as Indexed);
    } else {
      result[key] = rhs[key];
    }
  }

  return result;
}
