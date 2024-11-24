import { Block, BlockEventMap } from '../../core';
import { styled } from '../../core';
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
    this.getInputElement().value = this.props.value || '';
  };

  private _onBlur = (e: Event) => {
    this.eventBus.emit('blur', this, e);
  };

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
    return this.compile(styled(tpl, cs), this.props);
  }

  getInputElement() {
    return this.element as HTMLInputElement;
  }

  getValue() {
    return this.props.value || '';
  }
}
