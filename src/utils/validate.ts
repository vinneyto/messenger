import { InputGroup } from '../components/input-group';

export function validate(
  props: Record<string, unknown>,
): Record<string, string> | null {
  const result: Record<string, string> = {};

  let valid = true;
  for (const field of Object.values(props)) {
    if (field instanceof InputGroup) {
      let blockValid = field.validate();
      if (!blockValid) {
        valid = false;
      }

      result[field.getName()] = field.getValue();
    }
  }

  if (valid) {
    console.log(result);

    return result;
  }

  return null;
}
