import Handlebars from 'handlebars/runtime';

import './index.css';

import * as icons from './components/icons';

// pages
import { render } from './core/render';
import { AppRouterBlock } from './pages/app-router';
import { Block } from './core';

for (const [key, icon] of Object.entries(icons)) {
  Handlebars.registerPartial(`icon_${key}`, icon);
}

Block.initHandlebarsHelpers();

document.addEventListener('DOMContentLoaded', () => {
  const appRouter = new AppRouterBlock();

  render('#app', appRouter);
});
