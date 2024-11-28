import { Block, styled } from '../../core';
import tpl from './chat-message.hbs';
import cs from './chat-message.module.css';

export type ChatMessageProps = {
  text: string;
  isOwn: boolean;
};

export class ChatMessage extends Block<ChatMessageProps> {
  render() {
    const messageClass = this.props.isOwn ? cs.own : cs.foreign;
    return this.compile(styled(tpl, cs), { ...this.props, messageClass });
  }
}
