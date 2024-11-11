import Handlebars from 'handlebars/runtime';
import { Router } from './Router';

import './index.css';

// components
import button from './components/button';
import input from './components/input';
import inputGroup from './components/input-group';
import linkButton, { initLinkButton } from './components/link-button';
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
import chatAreaPage from './pages/chat-area';
import signInPage from './pages/sign-in';
import signUpPage from './pages/sign-up';
import smthWrong from './pages/smth-wrong';
import { chatItems } from './mockData';
import chatFooter from './components/chat-footer';
import userProfile from './pages/user-profile';
import userProfileData from './pages/user-profile-data';
import userProfilePassword from './pages/user-profile-password';
import { initForms } from './utils/navigation';

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
Handlebars.registerPartial('profileLayout', profileLayout);

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

  const router = new Router(
    [
      makeRoute('/', chatAreaPage, () => ({ chatItems })),
      makeRoute('/user-profile', userProfile),
      makeRoute('/user-profile-data', userProfileData),
      makeRoute('/user-profile-password', userProfilePassword),
      makeRoute('/sign-in', signInPage, () =>
        urlParams.has('login') ? { errors: { login: 'Wrong login' } } : {},
      ),
      makeRoute('/sign-up', signUpPage),
      makeRoute('/404', smthWrong, () => ({ code: 404 })),
      makeRoute('/500', smthWrong, () => ({ code: 500 })),
    ],
    { fallback: '/404' },
  );

  initForms(router);

  // init link buttons
  initLinkButton(router);
});
