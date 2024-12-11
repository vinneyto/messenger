/* eslint-disable max-classes-per-file */

import { Block, DefaultProps } from '../core';
import { State, store } from './store';

export function Connect<
  P extends DefaultProps,
  T extends { new (...rest: any[]): Block<any, any> },
>(mapStateToProps: (state: State) => Partial<P>) {
  return (BaseClass: T) => {
    return class extends BaseClass {
      private _handleStateUpdate: () => void;

      constructor(...args: any[]) {
        super({
          ...(args[0] instanceof Object ? args[0] : {}),
          ...mapStateToProps(store.state),
        });

        this._handleStateUpdate = () => {
          this.setProps(mapStateToProps(store.state));
        };

        store.on('Updated', this._handleStateUpdate);
      }

      destroy() {
        store.off('Updated', this._handleStateUpdate);
        super.destroy();
      }
    };
  };
}
