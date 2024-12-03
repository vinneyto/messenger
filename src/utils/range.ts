export function range(
  start: number,
  end?: number,
  step?: number,
  isRight = false,
) {
  const result = [];

  if (end === undefined) {
    // eslint-disable-next-line no-param-reassign
    end = start;
    // eslint-disable-next-line no-param-reassign
    start = 0;
  }

  if (step === undefined) {
    // eslint-disable-next-line no-param-reassign
    step = end > start ? 1 : -1;
  }

  if (step === 0) {
    const count = Math.abs(end - start);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      result.push(start);
    }
  } else if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  if (isRight) {
    result.reverse();
  }

  return result;
}

export function rangeRight(start: number, end?: number, step?: number) {
  return range(start, end, step, true);
}
