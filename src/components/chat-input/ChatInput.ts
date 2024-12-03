import { InputGroupBase } from '../input-group-base';
import { styled } from '../../core';
import tpl from './chat-input.hbs';
import cs from './chat-input.module.css';
import { NOT_EMPTY_REGEX } from '../../constants';

export class ChatInput extends InputGroupBase {
  constructor() {
    super({
      id: 'message',
      name: 'message',
      type: 'text',
      label: 'Type a message...',
      inputClassName: cs.input,
      validation: NOT_EMPTY_REGEX,
    });
  }

  protected getInputClassName() {
    if (!this.props.hasError) {
      return super.getInputClassName();
    }

    return `${super.getInputClassName()} ${cs.error}`;
  }

  renderTemplate() {
    return this.compile(styled(tpl, cs), this.props);
  }
}
