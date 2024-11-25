import { Block } from '../../core';

import { styled } from '../../core';
import { ProfileBack } from '../profile-back/ProfileBack';
import tpl from './profile-layout.hbs';
import cs from './profile-layout.module.css';

export type ProfileLayoutProps = {
  profileBack: ProfileBack;
};

export abstract class ProfileLayout<
  Props extends ProfileLayoutProps = ProfileLayoutProps,
> extends Block<Props> {
  constructor(props: Omit<Props, 'profileBack'>) {
    super({
      ...props,
      profileBack: new ProfileBack(),
    } as Props);

    this.props.profileBack.eventBus.on('click', this.goBack.bind(this));
  }

  abstract renderContent(): DocumentFragment;

  abstract goBack(): void;

  render(): DocumentFragment {
    const layout = this.compile(
      styled(tpl, cs, { csName: 'csProfileLayout' }),
      this.props,
    );

    const main = layout.querySelector('main') as HTMLElement;

    main.appendChild(this.renderContent());

    return layout;
  }
}
