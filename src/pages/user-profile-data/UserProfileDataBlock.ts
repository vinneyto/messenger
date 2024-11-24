import { Block } from '../../core';
import { InputGroup } from '../../components/input-group';
import { Button } from '../../components/button';
import tpl from './user-profile-data.hbs';
import {
  EMAIL_REGEX,
  LOGIN_REGEX,
  FIRST_NAME_REGEX,
  SECOND_NAME_REGEX,
  PHONE_REGEX,
  DISPLAY_NAME_REGEX,
} from '../../constants';
import { validate } from '../../utils/validate';

export type UserProfileDataBlockProps = {
  emailInput: InputGroup;
  loginInput: InputGroup;
  firstNameInput: InputGroup;
  secondNameInput: InputGroup;
  displayNameInput: InputGroup;
  phoneInput: InputGroup;
  submitButton: Button;
};

export class UserProfileDataBlock extends Block<UserProfileDataBlockProps> {
  constructor() {
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
      displayNameInput: new InputGroup({
        id: 'display_name',
        name: 'display_name',
        label: 'Nickname',
        type: 'text',
        validation: DISPLAY_NAME_REGEX,
      }),
      phoneInput: new InputGroup({
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        type: 'text',
        validation: PHONE_REGEX,
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
  };

  render() {
    return this.compile(tpl, this.props);
  }
}
