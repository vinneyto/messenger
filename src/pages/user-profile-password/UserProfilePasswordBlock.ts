import { InputGroup } from '../../components/input-group';
import { Button } from '../../components/button';
import tpl from './user-profile-password.hbs';
import { PASSWORD_REGEX } from '../../constants';
import { validate } from '../../utils/validate';
import {
  ProfileLayout,
  ProfileLayoutProps,
} from '../../components/profile-layout';

export type UserProfilePasswordBlockProps = {
  readonly oldPasswordInput: InputGroup;
  readonly newPasswordInput: InputGroup;
  readonly confirmPasswordInput: InputGroup;
  readonly submitButton: Button;
};

export class UserProfilePasswordBlock extends ProfileLayout<
  UserProfilePasswordBlockProps & ProfileLayoutProps
> {
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

    validate(this.props);

    const { newPasswordInput, confirmPasswordInput } = this.props;
    confirmPasswordInput.setProps({ errorMessage: undefined });

    if (newPasswordInput.getValue() !== confirmPasswordInput.getValue()) {
      confirmPasswordInput.setProps({
        hasError: true,
        errorMessage: 'Passwords do not match',
      });
    }
  };

  getBackHref() {
    return '/user-profile';
  }

  renderContent() {
    return this.compile(tpl, this.props);
  }
}
