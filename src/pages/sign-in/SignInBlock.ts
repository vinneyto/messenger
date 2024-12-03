import { Button } from '../../components/button';
import { InputGroup } from '../../components/input-group';
import { LinkButton } from '../../components/link-button';
import { LOGIN_REGEX, PASSWORD_REGEX } from '../../constants';
import { Block, Router, styled } from '../../core';
import { validate } from '../../utils/validate';
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
        validation: LOGIN_REGEX,
      }),
      passwordInput: new InputGroup({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        validation: PASSWORD_REGEX,
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

    this.props.signUpButton.eventBus.on('click', this._onSignUpClick);

    this.setEvents({ submit: this._onSubmit });
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    const valid = validate(this.props);

    if (!valid) {
      return;
    }

    setTimeout(() => {
      this.router.navigate('/');
    }, 500);
  };

  private _onSignUpClick = () => {
    this.router.navigate('/sign-up');
  };

  render() {
    return this.compile(styled(signInTpl, cs), this.props);
  }
}
