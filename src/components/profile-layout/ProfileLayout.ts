import { Block } from '../../core';

import { styled } from '../../core';
import { ProfileAvatar } from '../profile-avatar';
import { ProfileBack } from '../profile-back';
import tpl from './profile-layout.hbs';
import cs from './profile-layout.module.css';

export type ProfileLayoutProps = {
  profileBack: ProfileBack;
  profileAvatar: ProfileAvatar;
};

export abstract class ProfileLayout<
  Props extends ProfileLayoutProps = ProfileLayoutProps,
> extends Block<Props> {
  constructor(props: Omit<Props, 'profileBack' | 'profileAvatar'>) {
    super({
      ...props,
      profileBack: new ProfileBack({ href: '/' }),
      profileAvatar: new ProfileAvatar(),
    } as Props);
  }

  abstract renderContent(): DocumentFragment;

  abstract getBackHref(): string;

  render(): DocumentFragment {
    this.props.profileBack.props.href = this.getBackHref();

    const layout = this.compile(
      styled(tpl, cs, { csName: 'csProfileLayout' }),
      this.props,
    );

    const main = layout.querySelector('main') as HTMLElement;

    main.appendChild(this.renderContent());

    return layout;
  }
}
