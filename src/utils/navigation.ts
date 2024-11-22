import { Router } from '../core/Router';

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
