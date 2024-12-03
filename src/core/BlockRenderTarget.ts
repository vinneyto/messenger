import { type Block } from './Block';

/**
 * Dynamic render target for block
 */
export class BlockRenderTarget {
  private target: Element | null = null;

  constructor(public readonly block: Block) {}

  mount(target: Element, replace = false) {
    this.unsubscribe();

    if (replace) {
      this._replaceTarget(target);
    } else {
      this._addIntoTarget(target);
    }

    this.block.eventBus.on(
      'flow:component-did-update',
      this._handleComponentDidUpdate,
    );
  }

  private _handleComponentDidUpdate = () => {
    if (!this.target) {
      return;
    }

    this._replaceTarget(this.target);
  };

  private _addIntoTarget = (target: Element) => {
    target.appendChild(this.block.element);

    this.target = this.block.element;
  };

  private _replaceTarget = (target: Element) => {
    target.replaceWith(this.block.element);

    this.target = this.block.element;
  };

  unsubscribe() {
    this.block.eventBus.off(
      'flow:component-did-update',
      this._handleComponentDidUpdate,
    );
  }

  unmount() {
    if (!this.target) {
      return;
    }
    this.unsubscribe();
    this.target.remove();
  }
}
