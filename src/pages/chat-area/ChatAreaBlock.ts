import { Block, styled } from '../../core';
import { chatItems, chatMessages } from '../../mockData';
import tpl from './chat-area.hbs';
import cs from './chat-area.module.css';
import { ChatLinkProfile } from '../../components/chat-link-profile';
import { ChatSearch } from '../../components/chat-search';
import { ChatItem, ChatItemProps } from '../../components/chat-item';
import { ChatHeader } from '../../components/chat-header';
import { ChatFooter } from '../../components/chat-footer';
import { ChatMessage, ChatMessageProps } from '../../components/chat-message';

export type ChatAreaProps = {
  chatItems: ChatItemProps[];
  messages: ChatMessageProps[];

  readonly linkProfile: ChatLinkProfile;
  readonly chatSearch: ChatSearch;
  readonly header: ChatHeader;
  readonly footer: ChatFooter;
};

export class ChatAreaBlock extends Block<ChatAreaProps> {
  constructor() {
    super({
      chatItems,
      messages: chatMessages,
      linkProfile: new ChatLinkProfile(),
      chatSearch: new ChatSearch(),
      header: new ChatHeader(),
      footer: new ChatFooter(),
    });
  }

  render() {
    const fragment = this.compile(styled(tpl, cs), this.props);

    const list = fragment.querySelector(
      `.${cs.sidebarChats}`,
    ) as HTMLUListElement;

    this.props.chatItems.forEach((item) => {
      const chatItem = new ChatItem(item);
      chatItem.mount(list);
    });

    const messagesContainer = fragment.querySelector(
      `.${cs.messagesContainer}`,
    ) as HTMLDivElement;

    this.props.messages.forEach((message) => {
      const chatMessage = new ChatMessage(message);
      chatMessage.mount(messagesContainer);
    });

    return fragment;
  }
}
