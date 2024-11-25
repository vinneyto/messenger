import { Block, styled } from '../../core';
import tpl from './smth-wrong.hbs';
import cs from './smth-wrong.module.css';

export type SmthWrongProps = {
  code: number;
};

export class SmthWrongBlock extends Block<SmthWrongProps> {
  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
