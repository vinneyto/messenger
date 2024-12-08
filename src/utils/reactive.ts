import { EventBus } from '../core';

export type ReactiveEventMap = { Updated: [] };

export type ReactiveEventBus = EventBus<ReactiveEventMap>;

export function reactive<R extends Record<string, Function>>(
  eventBut: ReactiveEventBus,
  reducers: R,
) {
  const reactiveReducers = {} as R;
  for (const key in reducers) {
    // eslint-disable-next-line no-prototype-builtins
    if (reducers.hasOwnProperty(key)) {
      reactiveReducers[key] = ((payload: any) => {
        reducers[key](payload);
        eventBut.emit('Updated');
      }) as unknown as R[typeof key];
    }
  }
  return reactiveReducers;
}
