import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './link-button.hbs';
import cs from './link-button.module.css';

export type LinkButtonProps = {
  label: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
};

export class LinkButton extends Block<LinkButtonProps> {
  constructor(props: LinkButtonProps) {
    super({
      label: props.label,
      className: props.className,
      onClick: props.onClick,
    });
  }

  componentShouldUpdate(oldProps: LinkButtonProps, newProps: LinkButtonProps) {
    this.setEvents({ click: this.props.onClick });

    if (
      oldProps.label !== newProps.label ||
      oldProps.className !== newProps.className
    ) {
      return true;
    }

    return false;
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
