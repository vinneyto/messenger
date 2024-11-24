import { Block, styled } from '../../core';
import tpl from './input-group.hbs';
import cs from './input-group.module.css';

export type InputGroupProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  inputClassName?: string;
  errorMessage?: string;
};

export class InputGroup extends Block<InputGroupProps> {
  constructor(props: InputGroupProps) {
    super(props);

    this.setEvents({ input: this._onInput });
  }

  private _onInput = (e: Event) => {
    if (e.target instanceof HTMLInputElement && e.target.id) {
      const label = document.querySelector(`label[for="${e.target.id}"]`);
      if (!label) {
        return;
      }
      if (e.target.value) {
        label.classList.add(cs.labelVisible);
      } else {
        label.classList.remove(cs.labelVisible);
      }
    }
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
