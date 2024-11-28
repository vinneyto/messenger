import { Block, styled } from '../../core';
import tpl from './profile-field.hbs';
import cs from './profile-field.module.css';

export type ProfileFieldProps = {
  label: string;
  value: string;
};

export class ProfileField extends Block {
  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
