import { InputGroup } from '../components/input-group';

export function validate(props: Record<string, unknown>) {
  let valid = true;

  for (const value of Object.values(props)) {
    if (value instanceof InputGroup) {
      let blockValid = value.validate();
      if (!blockValid) {
        valid = false;
      }
    }
  }

  return valid;
}
