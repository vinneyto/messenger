import { InputGroup } from '../../components/input-group';
import { Block, Router } from '../../core';
import { styled } from '../../core';
import tpl from './sign-up.hbs';
import cs from './sign-up.module.css';
import { Button } from '../../components/button';
import { LinkButton } from '../../components/link-button';
import { validate } from '../../utils/validate';
import {
  EMAIL_REGEX,
  LOGIN_REGEX,
  FIRST_NAME_REGEX,
  SECOND_NAME_REGEX,
  PHONE_REGEX,
  PASSWORD_REGEX,
} from '../../constants';

export type SignUpBlockProps = {
  emailInput: InputGroup;
  loginInput: InputGroup;
  firstNameInput: InputGroup;
  secondNameInput: InputGroup;
  phoneInput: InputGroup;
  passwordInput: InputGroup;
  confirmPasswordInput: InputGroup;
  submitButton: Button;
  signInButton: LinkButton;
};

export class SignUpBlock extends Block<SignUpBlockProps> {
  constructor(private readonly router: Router) {
    super({
      emailInput: new InputGroup({
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        validation: EMAIL_REGEX,
      }),
      loginInput: new InputGroup({
        id: 'login',
        name: 'login',
        label: 'Login',
        type: 'text',
        validation: LOGIN_REGEX,
      }),
      firstNameInput: new InputGroup({
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        type: 'text',
        validation: FIRST_NAME_REGEX,
      }),
      secondNameInput: new InputGroup({
        id: 'second_name',
        name: 'second_name',
        label: 'Last name',
        type: 'text',
        validation: SECOND_NAME_REGEX,
      }),
      phoneInput: new InputGroup({
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        type: 'text',
        validation: PHONE_REGEX,
      }),
      passwordInput: new InputGroup({
        id: 'password',
        name: 'password',
        label: 'Password',
        type: 'password',
        validation: PASSWORD_REGEX,
        inputClassName: cs.inputPasswordError,
      }),
      confirmPasswordInput: new InputGroup({
        id: 'confirmPassword',
        name: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        validation: PASSWORD_REGEX,
      }),
      submitButton: new Button({
        type: 'submit',
        label: 'Create account',
        className: cs.submitButton,
      }),
      signInButton: new LinkButton({
        label: 'Sign in',
        className: cs.signUpLink,
      }),
    });

    this.props.signInButton.eventBus.on('click', this._onSignUpClick);

    this.setEvents({ submit: this._onSubmit });
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    let [valid] = validate(this.props);

    const { passwordInput, confirmPasswordInput } = this.props;
    confirmPasswordInput.setProps({ errorMessage: undefined });

    if (passwordInput.getValue() !== confirmPasswordInput.getValue()) {
      confirmPasswordInput.setProps({
        hasError: true,
        errorMessage: 'Passwords do not match',
      });
      valid = false;
    }
  };

  private _onSignUpClick = () => {
    this.router.navigate('/sign-in');
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
