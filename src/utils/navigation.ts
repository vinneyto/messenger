import { Router } from '../Router';

export function initLinks(router: Router) {
  document.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
      const path = e.target.getAttribute('href');
      if (path) {
        router.navigate(path);
      }
    }
  });
}

export function initForms(router: Router) {
  document.addEventListener('submit', (e) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      const path = e.target.getAttribute('action');
      if (path) {
        router.navigate(path);
      }
    }
  });
}
