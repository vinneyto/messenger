import { InputGroup } from '../../components/input-group';
import { Button } from '../../components/button';
import tpl from './user-profile-data.hbs';
import {
  EMAIL_REGEX,
  LOGIN_REGEX,
  FIRST_NAME_REGEX,
  SECOND_NAME_REGEX,
  PHONE_REGEX,
  NOT_EMPTY_REGEX,
} from '../../constants';
import { validate } from '../../utils/validate';
import {
  ProfileLayout,
  ProfileLayoutProps,
} from '../../components/profile-layout';
import { Connect } from '../../store';

export type UserProfileDataBlockProps = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export type UserProfileDataBlockState = {
  readonly emailInput: InputGroup;
  readonly loginInput: InputGroup;
  readonly firstNameInput: InputGroup;
  readonly secondNameInput: InputGroup;
  readonly displayNameInput: InputGroup;
  readonly phoneInput: InputGroup;
  readonly submitButton: Button;
};

@Connect((state) => ({
  email: state.user.email,
  login: state.user.login,
  first_name: state.user.first_name,
  second_name: state.user.second_name,
  display_name: state.user.display_name,
  phone: state.user.phone,
}))
export class UserProfileDataBlock extends ProfileLayout<
  UserProfileDataBlockProps & UserProfileDataBlockState & ProfileLayoutProps
> {
  constructor(props: Partial<UserProfileDataBlockProps> = {}) {
    const user = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      ...props,
    };

    super({
      ...user,

      // state
      emailInput: new InputGroup({
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        validation: EMAIL_REGEX,
        value: user.email,
      }),
      loginInput: new InputGroup({
        id: 'login',
        name: 'login',
        label: 'Login',
        type: 'text',
        validation: LOGIN_REGEX,
        value: user.login,
      }),
      firstNameInput: new InputGroup({
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        type: 'text',
        validation: FIRST_NAME_REGEX,
        value: user.first_name,
      }),
      secondNameInput: new InputGroup({
        id: 'second_name',
        name: 'second_name',
        label: 'Last name',
        type: 'text',
        validation: SECOND_NAME_REGEX,
        value: user.second_name,
      }),
      displayNameInput: new InputGroup({
        id: 'display_name',
        name: 'display_name',
        label: 'Nickname',
        type: 'text',
        validation: NOT_EMPTY_REGEX,
        value: user.display_name,
      }),
      phoneInput: new InputGroup({
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        type: 'text',
        validation: PHONE_REGEX,
        value: user.phone,
      }),
      submitButton: new Button({
        type: 'submit',
        label: 'Save',
        className: 'profile-submit',
      }),
    });

    this.setEvents({ submit: this._onSubmit });
  }

  componentShouldUpdate() {
    const state = this.props as UserProfileDataBlockState;
    const props = this.props as UserProfileDataBlockProps;

    state.emailInput.props.value = props.email;
    state.loginInput.props.value = props.login;
    state.firstNameInput.props.value = props.first_name;
    state.secondNameInput.props.value = props.second_name;
    state.displayNameInput.props.value = props.display_name;
    state.phoneInput.props.value = props.phone;

    return false;
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    validate({
      email: this.props.emailInput,
      login: this.props.loginInput,
      first_name: this.props.firstNameInput,
      second_name: this.props.secondNameInput,
      display_name: this.props.displayNameInput,
      phone: this.props.phoneInput,
    });
  };

  getBackHref() {
    return '/user-profile';
  }

  renderContent() {
    return this.compile(tpl, this.props);
  }
}
