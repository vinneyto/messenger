import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './profile-back.hbs';
import cs from './profile-back.module.css';

export type ProfileBackProps = {
  href: string;
};

export class ProfileBack extends Block<ProfileBackProps> {
  constructor(props: ProfileBackProps) {
    super(props);
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
