import { Block } from '../../core';
import { styled } from '../../core/styled';
import tpl from './smth-wrong.hbs';
import cs from './smth-wrong.module.css';

export type SmthWrongProps = {
  code: number;
};

export class SmthWrongBlock extends Block<SmthWrongProps> {
  constructor(props: SmthWrongProps) {
    super(props);
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
