import Handlebars from 'handlebars/runtime';

import './index.css';

// components
import button from './components/button';
import input from './components/input';
import inputGroup from './components/input-group';
import linkButton from './components/link-button';
import chatLinkProfile from './components/chat-link-profile';
import chatSearch from './components/chat-search';
import chatItem from './components/chat-item';
import chatHeader from './components/chat-header';
import profileBack from './components/profile-back';
import profileAvatar from './components/profile-avatar';
import profileField from './components/profile-field';
import profileLayout from './components/profile-layout';

import * as icons from './components/icons';

// pages
import chatFooter from './components/chat-footer';
import { render } from './core/render';
import { AppRouterBlock } from './pages/app-router';
import { Block } from './core';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('inputGroup', inputGroup);
Handlebars.registerPartial('linkButton', linkButton);
Handlebars.registerPartial('chatLinkProfile', chatLinkProfile);
Handlebars.registerPartial('chatSearch', chatSearch);
Handlebars.registerPartial('chatItem', chatItem);
Handlebars.registerPartial('chatHeader', chatHeader);
Handlebars.registerPartial('chatFooter', chatFooter);
// Handlebars.registerPartial('userProfile', userProfile);
Handlebars.registerPartial('profileBack', profileBack);
Handlebars.registerPartial('profileAvatar', profileAvatar);
Handlebars.registerPartial('profileField', profileField);

for (const [key, icon] of Object.entries(icons)) {
  Handlebars.registerPartial(`icon_${key}`, icon);
}

Block.initHandlebarsHelpers();

document.addEventListener('DOMContentLoaded', () => {
  const appRouter = new AppRouterBlock();

  render('#app', appRouter);
});
