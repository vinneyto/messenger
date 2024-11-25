import { Block, BlockEventMap } from '../../core';
import { styled } from '../../core';
import tpl from './profile-back.hbs';
import cs from './profile-back.module.css';

export type ProfileBackProps = {};

export interface ProfileBackEventMap extends BlockEventMap<ProfileBackProps> {
  click: [ProfileBack];
}

export class ProfileBack extends Block<ProfileBackProps, ProfileBackEventMap> {
  constructor() {
    super({});

    this.setEvents({ click: this._onClick });
  }

  private _onClick = (e: Event) => {
    e.preventDefault();
    this.eventBus.emit('click', this);
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
