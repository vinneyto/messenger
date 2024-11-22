import { Block } from '../../core';
import { chatItems } from '../../mockData';
import { styled } from '../../core/styled';
import tpl from './chat-area.hbs';
import cs from './chat-area.module.css';

export type ChatAreaProps = {
  chatItems: {
    name: string;
    lastMessage: string;
  }[];
};

export class ChatAreaBlock extends Block<ChatAreaProps> {
  constructor() {
    super({ chatItems });
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
