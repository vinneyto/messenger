import { UserResponseDto } from '../../api';

export type UserState = UserResponseDto & {};

function createInitialState(): UserState {
  return {
    id: 0,
    avatar: '',
    email: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    login: '',
  };
}

export function createUserStore() {
  const state = createInitialState();

  const actions = {
    setUser(user: Partial<UserResponseDto>) {
      Object.assign(state, user);
    },

    clearUser() {
      Object.assign(state, createInitialState());
    },
  };

  return { state, actions };
}
