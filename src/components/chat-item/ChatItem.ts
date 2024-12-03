import { Block, styled } from '../../core';
import tpl from './chat-item.hbs';
import cs from './chat-item.module.css';

export type ChatItemProps = {
  name: string;
  lastMessage: string;
};

export class ChatItem extends Block<ChatItemProps> {
  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
