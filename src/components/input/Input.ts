import { Block, BlockEventMap, styled } from '../../core';
import tpl from './input.hbs';
import cs from './input.module.css';

export type InputProps = {
  id: string;
  name: string;
  type: string;
  value?: string;
  className?: string;
  placeholder?: string;
};

export interface InputEventMap extends BlockEventMap<InputProps> {
  input: [Input, Event];
  blur: [Input, Event];
}

export class Input extends Block<InputProps, InputEventMap> {
  constructor(props: InputProps) {
    super(props);

    this.setEvents({ input: this._onInput, blur: this._onBlur });
  }

  private _onInput = (e: Event) => {
    this.eventBus.emit('input', this, e);
    this.getInputElement().value = this.getValue();
  };

  private _onBlur = (e: Event) => {
    this.eventBus.emit('blur', this, e);
  };

  public focus() {
    this.getInputElement().focus();
  }

  componentShouldUpdate(oldProps: InputProps, newProps: InputProps) {
    if (
      oldProps.name !== newProps.name ||
      oldProps.placeholder !== newProps.placeholder ||
      oldProps.className !== newProps.className ||
      oldProps.type !== newProps.type ||
      oldProps.id !== newProps.id
    ) {
      return true;
    }

    if (oldProps.value !== newProps.value) {
      const input = this.element as HTMLInputElement;
      input.value = newProps.value || '';
    }

    return false;
  }

  render() {
    const fragment = this.compile(styled(tpl, cs), this.props);

    const input = fragment.querySelector('input') as HTMLInputElement;

    input.value = this.getValue();

    return fragment;
  }

  getInputElement() {
    return this.element as HTMLInputElement;
  }

  getValue() {
    return this.props.value || '';
  }

  setValue(value: string) {
    this.setProps({ value });
  }

  getName() {
    return this.props.name;
  }
}
