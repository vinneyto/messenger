import Handlebars from 'handlebars/runtime';
import { Router } from './Router';

import './index.css';

// components
import button from './components/button';

// pages
import chatAreaPage from './pages/chat-area.hbs';
import signInPage from './pages/sign-in.hbs';
import signUpPage from './pages/sign-up.hbs';
import notFound from './pages/not-found.hbs';

Handlebars.registerPartial('button', button);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element not found');
  }

  const makeRoute = (path: string, template: Handlebars.TemplateDelegate) => {
    return {
      path,
      action: () => {
        const html = template({});
        root.innerHTML = html;
      },
    };
  };

  new Router(
    [
      makeRoute('/', chatAreaPage),
      makeRoute('/sign-in', signInPage),
      makeRoute('/sign-up', signUpPage),
      makeRoute('/404', notFound),
    ],
    { fallback: '/404' },
  );
});
