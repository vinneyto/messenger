import { Block, Router } from '../../core';
import { styled } from '../../core';
import tpl from './smth-wrong.hbs';
import cs from './smth-wrong.module.css';

export type SmthWrongProps = {
  code: number;
};

export class SmthWrongBlock extends Block<SmthWrongProps> {
  constructor(
    private readonly router: Router,
    props: SmthWrongProps,
  ) {
    super(props);

    this.setEvents({ click: this._onClick });
  }

  private _onClick = (e: Event) => {
    e.preventDefault();

    this.router.navigate('/');
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
