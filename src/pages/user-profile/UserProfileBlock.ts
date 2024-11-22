import { styled } from '../../core/styled';
import { Block } from '../../core';
import tpl from './user-profile.hbs';
import cs from './user-profile.module.css';

export default styled(tpl, cs);

export class UserProfileBlock extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
