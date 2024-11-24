import { Block, BlockEventMap } from '../../core';
import { styled } from '../../core';
import tpl from './link-button.hbs';
import cs from './link-button.module.css';

export type LinkButtonProps = {
  label: string;
  className?: string;
};

export interface LinkButtonEvents extends BlockEventMap<LinkButtonProps> {
  click: [MouseEvent];
}

export class LinkButton extends Block<LinkButtonProps, LinkButtonEvents> {
  constructor(props: LinkButtonProps) {
    super({
      label: props.label,
      className: props.className,
    });

    this.setEvents({ click: this._onClick });
  }

  private _onClick = (e: MouseEvent) => {
    this.eventBus.emit('click', e);
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
