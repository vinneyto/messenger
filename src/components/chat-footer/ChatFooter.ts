import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './chat-footer.hbs';
import cs from './chat-footer.module.css';

export class ChatFooter extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
