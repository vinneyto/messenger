import { Block } from '../../core';
import { InputGroup } from '../../components/input-group';
import { Button } from '../../components/button';
import tpl from './user-profile-password.hbs';
import { PASSWORD_REGEX } from '../../constants';
import { validate } from '../../utils/validate';

export type UserProfilePasswordBlockProps = {
  oldPasswordInput: InputGroup;
  newPasswordInput: InputGroup;
  confirmPasswordInput: InputGroup;
  submitButton: Button;
};

export class UserProfilePasswordBlock extends Block<UserProfilePasswordBlockProps> {
  constructor() {
    super({
      oldPasswordInput: new InputGroup({
        id: 'oldPassword',
        name: 'oldPassword',
        label: 'Old password',
        type: 'password',
        validation: PASSWORD_REGEX,
      }),
      newPasswordInput: new InputGroup({
        id: 'newPassword',
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
        validation: PASSWORD_REGEX,
      }),
      confirmPasswordInput: new InputGroup({
        id: 'confirmPassword',
        name: 'confirmPassword',
        label: 'Repeat Password',
        type: 'password',
        validation: PASSWORD_REGEX,
      }),
      submitButton: new Button({
        type: 'submit',
        label: 'Save',
        className: 'profile-submit',
      }),
    });

    this.setEvents({ submit: this._onSubmit });
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    let [valid] = validate(this.props);

    const { newPasswordInput, confirmPasswordInput } = this.props;
    confirmPasswordInput.setProps({ errorMessage: undefined });

    if (newPasswordInput.getValue() !== confirmPasswordInput.getValue()) {
      confirmPasswordInput.setProps({
        hasError: true,
        errorMessage: 'Passwords do not match',
      });
      valid = false;
    }
  };

  render() {
    return this.compile(tpl, this.props);
  }
}
