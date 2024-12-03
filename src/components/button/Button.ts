import { Block, BlockEventMap, styled } from '../../core';
import tpl from './button.hbs';
import cs from './button.module.css';

export type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  label: string;
  className?: string;
};

export interface ButtonEvents extends BlockEventMap<ButtonProps> {
  click: [MouseEvent];
}

export class Button extends Block<ButtonProps, ButtonEvents> {
  constructor(props: ButtonProps) {
    super(props);

    this.setEvents({ click: this._onClick });
  }

  private _onClick = (e: MouseEvent) => {
    this.eventBus.emit('click', e);
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
