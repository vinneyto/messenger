import { styled } from '../../core';
import { isEqual } from '../../utils';
import { Input } from '../input';
import { InputGroupBase, InputGroupBaseProps } from '../input-group-base';
import tpl from './input-group.hbs';
import cs from './input-group.module.css';

export interface InputGroupProps extends InputGroupBaseProps {
  errorMessage?: string;
}

export class InputGroup extends InputGroupBase<InputGroupProps> {
  protected override onInput(input: Input): void {
    super.onInput(input);

    this._updateLabel(input.getInputElement());
  }

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

  componentShouldUpdate(
    oldProps: InputGroupProps,
    newProps: InputGroupProps,
  ): boolean {
    const oldSimple = { ...oldProps } as Record<string, unknown>;
    const newSimple = { ...newProps } as Record<string, unknown>;

    delete oldSimple.value;
    delete newSimple.value;

    delete oldSimple.input;
    delete newSimple.input;

    if (!isEqual(oldSimple, newSimple)) {
      return true;
    }

    if (oldProps.value !== newProps.value) {
      this.props.input.setValue(newProps.value ?? '');
    }

    return false;
  }

  renderTemplate(): DocumentFragment {
    const { props } = this;

    return this.compile(styled(tpl, cs), {
      ...props,
      errorMessage: props.errorMessage ?? 'Invalid input',
      labelClass: this.getValue() ? cs.labelVisible : '',
    });
  }
}
