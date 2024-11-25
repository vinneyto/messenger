import { Block, Router } from '../../core';
import { chatItems } from '../../mockData';
import { styled } from '../../core';
import tpl from './chat-area.hbs';
import cs from './chat-area.module.css';
import { ChatLinkProfile } from '../../components/chat-link-profile';
import { ChatSearch } from '../../components/chat-search';
import { ChatItem, ChatItemProps } from '../../components/chat-item';
import { ChatHeader } from '../../components/chat-header';
import { ChatFooter } from '../../components/chat-footer';

export type ChatAreaProps = {
  chatItems: ChatItemProps[];

  readonly linkProfile: ChatLinkProfile;
  readonly chatSearch: ChatSearch;
  readonly header: ChatHeader;
  readonly footer: ChatFooter;
};

export class ChatAreaBlock extends Block<ChatAreaProps> {
  constructor(private readonly router: Router) {
    super({
      chatItems,
      linkProfile: new ChatLinkProfile(),
      chatSearch: new ChatSearch(),
      header: new ChatHeader(),
      footer: new ChatFooter(),
    });

    this.props.linkProfile.eventBus.on('click', this._onClickProfile);
  }

  private _onClickProfile = () => {
    this.router.navigate('/user-profile');
  };

  render() {
    const fragment = this.compile(styled(tpl, cs), this.props);

    const list = fragment.querySelector(
      `.${cs.sidebarChats}`,
    ) as HTMLUListElement;

    this.props.chatItems.forEach((item) => {
      const chatItem = new ChatItem(item);
      chatItem.mount(list);
    });

    return fragment;
  }
}
