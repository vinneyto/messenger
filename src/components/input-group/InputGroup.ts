import { Block, styled } from '../../core';
import { Input } from '../input';
import tpl from './input-group.hbs';
import cs from './input-group.module.css';

export type InputGroupProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  validation?: RegExp;
  className?: string;
  inputClassName?: string;
  errorMessage?: string;
  hasError?: boolean;

  readonly input: Input;
};

export class InputGroup extends Block<InputGroupProps> {
  constructor(props: Omit<InputGroupProps, 'input'>) {
    super({
      ...props,
      input: new Input({
        id: props.id,
        name: props.name,
        placeholder: props.label,
        type: props.type ?? 'text',
      }),
    });

    this.props.input.eventBus.on('input', this._onInput);
    this.props.input.eventBus.on('blur', this._onBlur);
  }

  private _onInput = (input: Input) => {
    const target = input.getInputElement();

    this.props.input.setProps({ value: target.value });

    this._updateLabel(target);
  };

  private _onBlur = () => {
    this.validate();
  };

  private _updateLabel(target: HTMLInputElement) {
    if (target.id) {
      const label = document.querySelector(`label[for="${target.id}"]`);
      if (!label) {
        return;
      }
      if (target.value) {
        label.classList.add(cs.labelVisible);
      } else {
        label.classList.remove(cs.labelVisible);
      }
    }
  }

  validate() {
    if (!this.props.validation) {
      return true;
    }

    const { validation, input } = this.props;

    this.props.hasError = !validation.test(input.props.value || '');

    return !this.props.hasError;
  }

  render() {
    const { props } = this;

    props.input.setProps({
      id: props.id,
      name: props.name,
      className: props.inputClassName,
      placeholder: props.label,
      type: props.type ?? 'text',
    });

    return this.compile(styled(tpl, cs), {
      ...props,
      errorMessage: props.errorMessage ?? 'Invalid input',
      labelClass: props.input.props.value ? cs.labelVisible : '',
    });
  }

  getValue() {
    return this.props.input.getValue();
  }

  getName() {
    return this.props.input.getName();
  }
}
