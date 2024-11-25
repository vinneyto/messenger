import { Block, BlockEventMap } from '../../core';
import { styled } from '../../core';
import tpl from './chat-link-profile.hbs';
import cs from './chat-link-profile.module.css';

interface ChatLinkProfileProps {}

interface ChatLinkProfileEventMap extends BlockEventMap<ChatLinkProfileProps> {
  click: [ChatLinkProfile];
}

export class ChatLinkProfile extends Block<
  ChatLinkProfileProps,
  ChatLinkProfileEventMap
> {
  constructor() {
    super({});

    this.setEvents({ click: this._onClick });
  }

  private _onClick = (e: Event) => {
    e.preventDefault();
    this.eventBus.emit('click', this);
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
