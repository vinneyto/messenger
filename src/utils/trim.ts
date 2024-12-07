function escapeRegExp(str: string) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function trim(str: string, chars?: string) {
  if (chars === undefined) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  const escapedChars = escapeRegExp(chars);
  const regex = new RegExp(`^[${escapedChars}]+|[${escapedChars}]+$`, 'g');
  return str.replace(regex, '');
}
