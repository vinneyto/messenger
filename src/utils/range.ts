export function rangeRight(start: number, end?: number, step?: number) {
  return range(start, end, step, true);
}

export function range(
  start: number,
  end?: number,
  step?: number,
  isRight = false,
) {
  const result = [];

  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (step === undefined) {
    step = end > start ? 1 : -1;
  }

  if (step === 0) {
    const count = Math.abs(end - start);
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
