import { Block } from '../../core';
import { Input } from '../input';

export type InputGroupBaseProps = {
  id: string;
  name: string;
  label: string;
  value?: string;
  type?: string;
  validation?: RegExp;
  className?: string;
  inputClassName?: string;
  hasError?: boolean;

  readonly input: Input;
};

export abstract class InputGroupBase<
  Props extends InputGroupBaseProps = InputGroupBaseProps,
> extends Block<Props> {
  constructor(props: Omit<Props, 'input'>) {
    super({
      ...props,
      input: new Input({
        id: props.id,
        name: props.name,
        value: props.value,
        placeholder: props.label,
        type: props.type ?? 'text',
      }),
    } as Props);

    this.props.input.eventBus.on('input', this.onInput.bind(this));
    this.props.input.eventBus.on('blur', this.onBlur.bind(this));
  }

  protected onInput(input: Input): void {
    const target = input.getInputElement();

    this.props.input.setProps({ value: target.value });
  }

  protected onBlur(): void {
    this.validate();
  }

  protected getInputClassName() {
    return this.props.inputClassName;
  }

  validate() {
    if (!this.props.validation) {
      return true;
    }

    const { validation, input } = this.props;

    this.props.hasError = !validation.test(input.props.value || '');

    return !this.props.hasError;
  }

  abstract renderTemplate(): DocumentFragment;

  render() {
    const { props } = this;

    props.input.setProps({
      id: props.id,
      name: props.name,
      className: this.getInputClassName(),
      placeholder: props.label,
      type: props.type ?? 'text',
    });

    return this.renderTemplate();
  }

  focus() {
    this.props.input.focus();
  }

  getValue() {
    return this.props.input.getValue();
  }

  setValue(value: string) {
    this.props.input.setValue(value);
  }

  getName() {
    return this.props.input.getName();
  }
}
