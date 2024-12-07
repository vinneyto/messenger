type Indexed<T = any> = {
  [key in string]: T;
};

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const keys = path.split('.');
  let current = object as Indexed;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      current = current[key] as Indexed;
    }
  }

  return object;
}
