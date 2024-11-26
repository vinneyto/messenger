import { InputGroupBase } from '../components/input-group-base';

export function validate(
  props: Record<string, unknown>,
): Record<string, string> | null {
  const result: Record<string, string> = {};

  let valid = true;
  for (const field of Object.values(props)) {
    if (field instanceof InputGroupBase) {
      const blockValid = field.validate();
      if (!blockValid) {
        valid = false;
      }

      result[field.getName()] = field.getValue();
    }
  }

  if (valid) {
    console.log(result); // eslint-disable-line no-console

    return result;
  }

  return null;
}
