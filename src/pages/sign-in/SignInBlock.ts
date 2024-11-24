import { Button } from '../../components/button';
import { InputGroup } from '../../components/input-group';
import { LinkButton } from '../../components/link-button';
import { Block, Router } from '../../core';
import { styled } from '../../core';
import signInTpl from './sign-in.hbs';
import cs from './sign-in.module.css';

export type SignInProps = {
  readonly loginInput: InputGroup;
  readonly passwordInput: InputGroup;
  readonly signInButton: Button;
  readonly signUpButton: LinkButton;
};

export class SignInBlock extends Block<SignInProps> {
  constructor(private readonly router: Router) {
    super({
      loginInput: new InputGroup({
        id: 'login',
        name: 'login',
        label: 'Login',
      }),
      passwordInput: new InputGroup({
        id: 'password',
        name: 'password',
        label: 'Password',
      }),
      signInButton: new Button({
        type: 'submit',
        label: 'Sign in',
        className: cs.submitButton,
      }),
      signUpButton: new LinkButton({
        label: `Don't have an account?`,
        className: cs.signUpLink,
      }),
    });
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    this.router.navigate('/');
  };

  private _onSignUpClick = () => {
    this.router.navigate('/sign-up');
  };

  render() {
    this.props.signUpButton.props.onClick = this._onSignUpClick;

    this.setEvents({ submit: this._onSubmit });

    return this.compile(styled(signInTpl, cs), this.props);
  }
}
