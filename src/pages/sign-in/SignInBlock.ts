import { InputGroupBlock } from '../../components/input-group/InputGroupBlock';
import { Block } from '../../core';
import { styled } from '../../core';
import signInTpl from './sign-in.hbs';
import cs from './sign-in.module.css';

export type SignInProps = {
  readonly loginInput: InputGroupBlock;
  readonly passwordInput: InputGroupBlock;
};

export class SignInBlock extends Block<SignInProps> {
  constructor() {
    super({
      loginInput: new InputGroupBlock({
        id: 'login',
        name: 'login',
        label: 'Login',
      }),
      passwordInput: new InputGroupBlock({
        id: 'password',
        name: 'password',
        label: 'Password',
      }),
    });
  }

  render() {
    return this.compile(styled(signInTpl, cs), this.props);
  }
}
