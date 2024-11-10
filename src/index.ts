import Handlebars from 'handlebars/runtime';
import { Router } from './Router';

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

import * as icons from './components/icons';

// pages
import chatAreaPage from './pages/chat-area';
import signInPage from './pages/sign-in';
import signUpPage from './pages/sign-up';
import notFound from './pages/not-found.hbs';
import { chatItems } from './mockData';
import chatFooter from './components/chat-footer';
import userProfile from './pages/user-profile';
import profileBack from './components/profile-back';
import profileAvatar from './components/profile-avatar';
import profileField from './components/profile-field';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('inputGroup', inputGroup);
Handlebars.registerPartial('linkButton', linkButton);
Handlebars.registerPartial('chatLinkProfile', chatLinkProfile);
Handlebars.registerPartial('chatSearch', chatSearch);
Handlebars.registerPartial('chatItem', chatItem);
Handlebars.registerPartial('chatHeader', chatHeader);
Handlebars.registerPartial('chatFooter', chatFooter);
Handlebars.registerPartial('userProfile', userProfile);
Handlebars.registerPartial('profileBack', profileBack);
Handlebars.registerPartial('profileAvatar', profileAvatar);
Handlebars.registerPartial('profileField', profileField);

for (const [key, icon] of Object.entries(icons)) {
  Handlebars.registerPartial(`icon_${key}`, icon);
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element not found');
  }

  const urlParams = new URLSearchParams(window.location.search);

  const makeRoute = (
    path: string,
    template: Handlebars.TemplateDelegate,
    buildCtx = () => {},
  ) => {
    return {
      path,
      action: () => {
        const html = template(buildCtx());
        root.innerHTML = html;
      },
    };
  };

  new Router(
    [
      makeRoute('/', chatAreaPage, () => ({ chatItems })),
      makeRoute('/user-profile', userProfile),
      makeRoute('/sign-in', signInPage, () =>
        urlParams.has('login') ? { errors: { login: 'Wrong login' } } : {},
      ),
      makeRoute('/sign-up', signUpPage),
      makeRoute('/404', notFound),
    ],
    { fallback: '/404' },
  );
});
