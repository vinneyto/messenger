import { Block } from '../../core';
import { styled } from '../../core/styled';
import tpl from './sign-up.hbs';
import cs from './sign-up.module.css';

export class SignUpBlock extends Block {
  constructor() {
    super({});
  }

  render(): DocumentFragment {
    return this.compile(styled(tpl, cs), this.props);
  }
}
