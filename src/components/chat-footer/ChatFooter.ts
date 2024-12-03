import { Block, styled } from '../../core';
import { validate } from '../../utils/validate';
import { ChatInput } from '../chat-input';
import tpl from './chat-footer.hbs';
import cs from './chat-footer.module.css';

export type ChatFooterProps = {
  chatInput: ChatInput;
};

export class ChatFooter extends Block<ChatFooterProps> {
  constructor() {
    super({
      chatInput: new ChatInput(),
    });

    this.setEvents({ submit: this._onSubmit });
  }

  private _onSubmit = (e: Event) => {
    e.preventDefault();

    validate(this.props);

    this.props.chatInput.setValue('');
    // this.props.chatInput.focus();
  };

  render() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
