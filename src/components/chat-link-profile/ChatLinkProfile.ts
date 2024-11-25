import { Block, styled } from '../../core';
import tpl from './chat-link-profile.hbs';
import cs from './chat-link-profile.module.css';

interface ChatLinkProfileProps {}

export class ChatLinkProfile extends Block<ChatLinkProfileProps> {
  constructor() {
    super({});
  }

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
