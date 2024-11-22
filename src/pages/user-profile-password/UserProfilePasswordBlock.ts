import { Block } from '../../core';
import tpl from './user-profile-password.hbs';

export class UserProfilePasswordBlock extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
