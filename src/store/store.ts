import { EventBus } from '../core';
import { reactive, ReactiveEventMap } from '../utils';
import { createUserStore } from './parts/users';

type UserStore = ReturnType<typeof createUserStore>;

export type State = {
  readonly user: UserStore['state'];
};

export type Actions = {
  readonly user: UserStore['actions'];
};

class Store extends EventBus<ReactiveEventMap> {
  readonly state: State;

  readonly actions: Actions;

  constructor() {
    super();

    const user = createUserStore();

    this.state = {
      user: user.state,
    };

    this.actions = {
      user: reactive(this, user.actions),
    };
  }
}

export const store = new Store();
