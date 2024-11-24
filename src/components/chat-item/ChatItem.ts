import { Block } from '../../core';
import { styled } from '../../core';
import tpl from './chat-item.hbs';
import cs from './chat-item.module.css';

export type ChatItemProps = {
  name: string;
  lastMessage: string;
};

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super(props);
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
