import Handlebars from 'handlebars/runtime';
import { v4 } from 'uuid';
import { EventBus } from './EventBus';
import { BlockRenderTarget } from './BlockRenderTarget';

export type BlockEventMap<Props> = {
  'flow:component-did-mount': []; // element is inserted into DOM
  'flow:component-should-update': [Props, Props]; // request component rendering
  'flow:component-did-update': []; // we have updated element on this step
  'flow:render': [];
};

export type DefaultProps = {
  [key: string]: any;
};

export type BlockEvents = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
};

export abstract class Block<
  Props extends DefaultProps = DefaultProps,
  EventMap extends BlockEventMap<Props> = BlockEventMap<Props>,
> {
  public static initHandlebarsHelpers() {
    Handlebars.registerHelper('block', function (block?: Block) {
      if (!block || !(block instanceof Block)) {
        return '';
      }
      return new Handlebars.SafeString(`<div data-id="${block.id}"></div>`);
    });
  }

  public readonly id = v4();

  public readonly eventBus: EventBus<EventMap>;

  private readonly _renderTarget: BlockRenderTarget;

  private _props: Props;
  private _events: BlockEvents = {};
  private _element: Element | null = null;
  private _domEvents: { [key: string]: EventListener } = {};
  private _children: Record<string, Block> = {};

  constructor(props: Props, events: BlockEvents = {}) {
    this._props = this._makePropsProxy(props);
    this._children = this._collectChildren(props);
    this._events = events;

    this.eventBus = new EventBus<EventMap>();
    this._renderTarget = new BlockRenderTarget(this as Block<any, any>);

    this._registerEvents(this.eventBus);
  }

  setEvents(events: BlockEvents) {
    this._events = events;
  }

  private _registerEvents(eventBus: EventBus<EventMap>) {
    eventBus.on('flow:component-did-mount', this._componentDidMount);
    eventBus.on('flow:component-should-update', this._componentShouldUpdate);
    eventBus.on('flow:component-did-update', this._componentDidUpdate);
    eventBus.on('flow:render', this._render);
  }

  mount(target: Element, replace = false) {
    if (!this._element) {
      // first render
      this.eventBus.emit('flow:render');
    }

    this._renderTarget.mount(target, replace);
  }

  unmount() {
    this._renderTarget.unmount();
  }

  _collectChildren(props: Props) {
    const children: Record<string, Block> = {};

    for (const [key, child] of Object.entries(props)) {
      if (child instanceof Block) {
        children[key] = child;
      }
    }

    return children;
  }

  dispatchComponentDidMount() {
    this.eventBus.emit('flow:component-did-mount');

    for (const child of Object.values(this._children)) {
      child.dispatchComponentDidMount();
    }
  }

  _componentDidMount = () => {
    this.componentDidMount(this.props);
  };

  componentDidMount(_oldProps: Props) {}

  private _componentShouldUpdate = (oldProps: Props, newProps: Props) => {
    const response = this.componentShouldUpdate(oldProps, newProps);

    if (response) {
      this.eventBus.emit('flow:render');
    }
  };

  componentShouldUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  private _componentDidUpdate = () => {
    this.componentDidUpdate();
  };

  componentDidUpdate() {}

  setProps = (nextProps: Partial<Props>) => {
    this._collapsePropsUpdate = true;

    const prevProps = { ...this.props };

    Object.assign(this.props, nextProps);

    if (this._propsChanged && this._element) {
      this.eventBus.emit('flow:component-should-update', prevProps, this.props);
    }

    this._propsChanged = false;
    this._collapsePropsUpdate = false;
  };

  private _addDOMEvents(element: Element) {
    for (const [eventName, callback] of Object.entries(this._events)) {
      if (!callback) {
        continue;
      }
      element.addEventListener(eventName, callback as EventListener);
      this._domEvents[eventName] = callback as EventListener;
    }
  }

  private _removeDOMEvents(element: Element) {
    for (const [eventName, callback] of Object.entries(this._domEvents)) {
      element.removeEventListener(eventName, callback);
    }
    this._domEvents = {};
  }

  private _render = () => {
    if (this._element) {
      this._removeDOMEvents(this._element);
    }

    for (const child of Object.values(this._children)) {
      // we are going to re-mount children - unsubscribe from previous render target
      child._renderTarget.unsubscribe();
    }

    const block = this.render();

    this._element = block.firstElementChild;

    if (!this._element) {
      throw new Error('Element is not created');
    }

    this._element.setAttribute('data-id', this.id);

    this._addDOMEvents(this._element);

    this.eventBus.emit('flow:component-did-update');
  };

  /**
   * Helper method which converts Handlebars template to DocumentFragment
   *
   * Alto it starts life circle for children components if they are present
   *
   * @param template
   * @param context
   * @returns
   */
  compile(
    template: Handlebars.TemplateDelegate,
    props: Record<string, any>,
  ): DocumentFragment {
    // run template
    const fragment = document.createElement('template');

    fragment.innerHTML = template(props);

    // mount children
    for (const child of Object.values(this._children)) {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        child.mount(stub, true);
      }
    }

    return fragment.content;
  }

  abstract render(): DocumentFragment;

  destroy() {
    if (this._element) {
      this._removeDOMEvents(this._element);
    }

    for (const child of Object.values(this._children)) {
      child.destroy();
    }

    this.eventBus.off('flow:component-did-mount', this._componentDidMount);
    this.eventBus.off(
      'flow:component-should-update',
      this._componentShouldUpdate,
    );
    this.eventBus.off('flow:component-did-update', this._componentDidUpdate);
    this.eventBus.off('flow:render', this._render);

    this._renderTarget.unsubscribe();
  }

  private _collapsePropsUpdate = false;
  private _propsChanged = false;

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy<Props>(props, {
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop as keyof Props] = value as Props[keyof Props];

        if (oldProps[prop as keyof Props] === value) {
          return true;
        }

        const oldBlock = self._children[prop as string];
        if (oldBlock instanceof Block) {
          // The block manages its own children
          oldBlock.destroy();
        }

        if (value instanceof Block || oldBlock instanceof Block) {
          self._children = self._collectChildren(target);
        }

        if (self._collapsePropsUpdate) {
          self._propsChanged = true;
          return true;
        }

        if (self._element) {
          self.eventBus.emit('flow:component-should-update', oldProps, target);
        }

        return true;
      },
      get(target, prop) {
        const value = target[prop as keyof Props];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      deleteProperty() {
        throw new Error('There is no access');
      },
    });
  }

  get element() {
    if (!this._element) {
      throw new Error('Component is not initialized');
    }
    return this._element;
  }

  get props() {
    return this._props;
  }
}
