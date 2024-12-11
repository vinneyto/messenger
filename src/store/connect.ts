import { Block, BlockEventMap, BlockEvents } from '../core/Block';
import { store, State } from './store';

type MapStateToProps<Props> = (state: State) => Partial<Props>;

export function connect<
  Props extends Record<string, any>,
  EventMap extends BlockEventMap<Props>,
>(
  WrappedBlock: typeof Block<Props, EventMap>,
  mapStateToProps: MapStateToProps<Props>,
) {
  return class extends WrappedBlock {
    private _handleStateUpdate: () => void;

    constructor(props: Props, events: BlockEvents = {}) {
      super({ ...props, ...mapStateToProps(store.state) }, events);

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
}
