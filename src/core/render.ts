import { Block } from './Block';

export function render(query: string, block: Block<any, any>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';

  block.mount(root);

  block.dispatchComponentDidMount();
}
