import { Block, BlockRenderTarget } from './Block';

export function render(query: string, block: Block<any, any>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Root element not found');
  }

  const stub = document.createElement('div');
  root.appendChild(stub);

  new BlockRenderTarget(block, stub);

  block.dispatchComponentDidMount();
}
