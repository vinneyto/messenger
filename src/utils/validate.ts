import { InputGroupBase } from '../components/input-group-base';

export function validate<Inputs extends Record<string, InputGroupBase>>(
  props: Inputs,
): Record<keyof Inputs, string> | null {
  const result: Record<keyof Inputs, string> = {} as Record<
    keyof Inputs,
    string
  >;

  let valid = true;
  for (const field of Object.values(props)) {
    const blockValid = field.validate();
    if (!blockValid) {
      valid = false;
    }

    result[field.getName() as keyof Inputs] = field.getValue();
  }

  if (valid) {
    console.log(result); // eslint-disable-line no-console

    return result;
  }

  return null;
}
