import { Block } from '../../core';
import { styled } from '../../core';
import signInTpl from './sign-in.hbs';
import cs from './sign-in.module.css';

export type SignInProps = {
  errors?: Record<string, string>;
};

export class SignInBlock extends Block<SignInProps> {
  constructor(props: SignInProps) {
    super(props);
  }

  render() {
    return this.compile(styled(signInTpl, cs), this.props);
  }
}
