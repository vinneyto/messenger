import { authApi, SigninDto } from '../api';
import { handleError, networkError } from '../core';
import { store } from '../store';

class AuthController {
  @handleError(networkError())
  async login(data: SigninDto) {
    await authApi.signin(data);

    const user = await authApi.getUser();

    store.actions.user.setUser(user);
  }

  @handleError(networkError())
  async logout() {
    await authApi.logout();

    store.actions.user.clearUser();
  }
}

export const authController = new AuthController();
