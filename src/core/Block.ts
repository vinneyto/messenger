import { v4 } from 'uuid';
import { EventBus } from './EventBus';

export type BlockEventMap<Props> = {
  init: [];
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

/**
 * Dynamic render target for block
 */
export class BlockRenderTarget {
  constructor(
    private readonly block: Block,
    private target: HTMLElement,
  ) {
    this._replaceTarget();
    block.eventBus.on('flow:component-did-update', this._replaceTarget);
  }

  private _replaceTarget = () => {
    this.target.replaceWith(this.block.element);
    this.target = this.block.element;
  };

  destroy() {
    this.block.eventBus.off('flow:component-did-update', this._replaceTarget);
  }
}

export abstract class Block<
  Props extends DefaultProps = DefaultProps,
  EventMap extends BlockEventMap<Props> = BlockEventMap<Props>,
> {
  public readonly id = v4();

  public readonly eventBus: EventBus<EventMap>;

  private _props: Props;
  private _events: BlockEvents = {};
  private _element: HTMLElement | null = null;
  private _domEvents: { [key: string]: EventListener } = {};
  private _children: Record<string, Block> = {};
  private _childrenTargets: BlockRenderTarget[] = [];

  constructor(props: Props, events: BlockEvents = {}) {
    this._props = this._makePropsProxy(props);
    this._children = this._collectChildren(props);
    this._events = events;

    this.eventBus = new EventBus<EventMap>();

    this._registerEvents(this.eventBus);
    this.eventBus.emit('init');
  }

  private _registerEvents(eventBus: EventBus<EventMap>) {
    eventBus.on('init', this._init);
    eventBus.on('flow:component-did-mount', this._componentDidMount);
    eventBus.on('flow:component-should-update', this._componentShouldUpdate);
    eventBus.on('flow:component-did-update', this._componentDidUpdate);
    eventBus.on('flow:render', this._render);
  }

  _init = () => {
    if (this._element) {
      throw new Error('Life circle already started');
    }

    // first render
    this.eventBus.emit('flow:render');
  };

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
    Object.assign(this.props, nextProps);
  };

  private _addDOMEvents() {
    if (!this._element) {
      throw new Error('Element is not created');
    }

    for (const [eventName, callback] of Object.entries(this._events)) {
      this._element.addEventListener(eventName, callback as EventListener);
      this._domEvents[eventName] = callback as EventListener;
    }
  }

  private _removeDOMEvents() {
    if (!this._element) {
      return;
    }

    for (const [eventName, callback] of Object.entries(this._domEvents)) {
      this._element.removeEventListener(eventName, callback);
    }
    this._domEvents = {};
  }

  private _unsubscribeChildren() {
    this._childrenTargets.forEach((target) => target.destroy());
    this._childrenTargets = [];
  }

  private _render = () => {
    this._unsubscribeChildren();

    const block = this.render();

    if (block.children.length !== 1) {
      throw new Error(
        "Block must have only one root element, we don't support fragments yet",
      );
    }

    this._removeDOMEvents();

    this._element = block.firstElementChild as HTMLElement;

    this._element.setAttribute('data-id', this.id);

    this._addDOMEvents();

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
    // generate stubs
    const propsAndStubs: Record<string, unknown> = { ...props };
    for (const [key, child] of Object.entries(this._children)) {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    }

    // run template
    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    // mount children
    for (const child of Object.values(this._children)) {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      if (!stub) {
        throw new Error('Stub not found');
      }
      this._childrenTargets.push(
        new BlockRenderTarget(child, stub as HTMLElement),
      );
    }

    return fragment.content;
  }

  // Может переопределять пользователь, необязательно трогать
  abstract render(): DocumentFragment;

  destroy() {
    this._removeDOMEvents();
    this._unsubscribeChildren();

    for (const child of Object.values(this._children)) {
      child.destroy();
    }

    this.eventBus.off('init', this._init);
    this.eventBus.off('flow:component-did-mount', this._componentDidMount);
    this.eventBus.off(
      'flow:component-should-update',
      this._componentShouldUpdate,
    );
    this.eventBus.off('flow:component-did-update', this._componentDidUpdate);
    this.eventBus.off('flow:render', this._render);
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy<Props>(props, {
      set(target, prop, value) {
        const oldProps = { ...target };
        target[prop as keyof Props] = value as Props[keyof Props];

        if (value instanceof Block) {
          const oldBlock = self._children[prop as string];

          if (oldBlock) {
            oldBlock.destroy();
          }

          self._children = self._collectChildren(target);
        }

        self.eventBus.emit('flow:component-should-update', oldProps, target);

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
      throw new Error('Element is not created');
    }
    return this._element;
  }

  get props() {
    return this._props;
  }
}
