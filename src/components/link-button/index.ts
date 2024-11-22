import { Router } from '../../core/Router';
import { styled } from '../../core';
import tpl from './link-button.hbs';
import cs from './link-button.module.css';

export function initLinkButton(router: Router) {
  document.addEventListener('click', (e) => {
    if (
      e.target instanceof HTMLButtonElement &&
      e.target.matches('[data-href]')
    ) {
      e.preventDefault();
      const path = e.target.getAttribute('data-href');
      if (path) {
        router.navigate(path);
      }
    }
  });
}

export default styled(tpl, cs);
