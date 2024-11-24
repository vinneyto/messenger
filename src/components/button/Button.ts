import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './button.hbs';
import cs from './button.module.css';

export type ButtonProps = {
  readonly type: 'button' | 'submit' | 'reset';
  readonly label: string;
  readonly className?: string;
  readonly onClick?: (e: MouseEvent) => void;
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  componentShouldUpdate(oldProps: ButtonProps, newProps: ButtonProps) {
    this.setEvents({ click: this.props.onClick });

    if (
      oldProps.label !== newProps.label ||
      oldProps.className !== newProps.className ||
      oldProps.type !== newProps.type
    ) {
      return true;
    }

    return false;
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
