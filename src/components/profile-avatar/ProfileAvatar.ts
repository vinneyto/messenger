import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './profile-avatar.hbs';
import cs from './profile-avatar.module.css';

export class ProfileAvatar extends Block {
  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
