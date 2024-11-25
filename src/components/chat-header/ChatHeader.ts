import { Block, styled } from '../../core';
import tpl from './chat-header.hbs';
import cs from './chat-header.module.css';

export class ChatHeader extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
