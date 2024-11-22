import { Block } from '../../core';
import tpl from './user-profile-data.hbs';

export class UserProfileDataBlock extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
