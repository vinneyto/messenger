import Handlebars from 'handlebars/runtime';
import { Router } from './Router';

import './index.css';

// components
import button from './components/button';
import input from './components/input';
import inputGroup from './components/input-group';
import linkButton from './components/link-button';

// pages
import chatAreaPage from './pages/chat-area.hbs';
import signInPage from './pages/sign-in';
import signUpPage from './pages/sign-up.hbs';
import notFound from './pages/not-found.hbs';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('inputGroup', inputGroup);
Handlebars.registerPartial('linkButton', linkButton);

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
      makeRoute('/', chatAreaPage),
      makeRoute('/sign-in', signInPage, () =>
        urlParams.has('login') ? { errors: { login: 'Wrong login' } } : {},
      ),
      makeRoute('/sign-up', signUpPage),
      makeRoute('/404', notFound),
    ],
    { fallback: '/404' },
  );
});
