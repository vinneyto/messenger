import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './chat-search.hbs';
import cs from './chat-search.module.css';

export class ChatSearch extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
