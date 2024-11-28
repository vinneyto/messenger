import {
  ProfileLayout,
  ProfileLayoutProps,
} from '../../components/profile-layout';
import { styled } from '../../core';
import { ProfileField } from '../../components/profile-field';
import tpl from './user-profile.hbs';
import cs from './user-profile.module.css';

export type UserProfileBlockProps = {
  emailField: ProfileField;
  loginField: ProfileField;
  firstNameField: ProfileField;
  secondNameField: ProfileField;
  nicknameField: ProfileField;
  phoneField: ProfileField;
};

export class UserProfileBlock extends ProfileLayout<
  UserProfileBlockProps & ProfileLayoutProps
> {
  constructor() {
    super({
      emailField: new ProfileField({ label: 'Email', value: 'jose@jose.es' }),
      loginField: new ProfileField({ label: 'Login', value: 'josejose' }),
      firstNameField: new ProfileField({ label: 'First name', value: 'Jose' }),
      secondNameField: new ProfileField({
        label: 'Second name',
        value: 'García López',
      }),
      nicknameField: new ProfileField({ label: 'Nickname', value: 'joseus' }),
      phoneField: new ProfileField({ label: 'Phone', value: '+34123456789' }),
    });
  }

  getBackHref() {
    return '/';
  }

  renderContent() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
