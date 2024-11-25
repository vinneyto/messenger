import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './profile-field.hbs';
import cs from './profile-field.module.css';

export type ProfileFieldProps = {
  label: string;
  value: string;
};

export class ProfileField extends Block {
  constructor(props: ProfileFieldProps) {
    super(props);
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
