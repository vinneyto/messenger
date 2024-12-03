export class EventBus<TEventMap extends Record<string, any[]> = any> {
  private readonly listeners: {
    [K in keyof TEventMap]?: Array<(...event: TEventMap[K]) => void>;
  } = {};

  on<K extends keyof TEventMap>(
    type: K,
    callback: (...event: TEventMap[K]) => void,
  ) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
  }

  off<K extends keyof TEventMap>(
    type: K,
    callback: (...event: TEventMap[K]) => void,
  ): boolean {
    if (!this.listeners[type]) {
      return false;
    }

    this.listeners[type] = this.listeners[type].filter(
      (eventCallback) => eventCallback !== callback,
    );

    if (this.listeners[type].length === 0) {
      delete this.listeners[type];
    }

    return true;
  }

  emit<K extends keyof TEventMap>(type: K, ...event: TEventMap[K]): boolean {
    if (!this.listeners[type]) {
      return false;
    }

    for (const callback of this.listeners[type]) {
      callback(...event);
    }

    return true;
  }
}
