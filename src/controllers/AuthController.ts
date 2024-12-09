import { authApi, SigninDto, SignupDto } from '../api';
import { appRouter } from '../appRouter';
import { handleError, networkError } from '../core';
import { store } from '../store';

class AuthController {
  @handleError(networkError())
  async login(data: SigninDto) {
    await authApi.signin(data);

    const user = await authApi.getUser();

    store.actions.user.setUser(user);

    appRouter.go('/');
  }

  @handleError(networkError())
  async signup(data: SignupDto) {
    await authApi.signup(data);

    appRouter.go('/sign-in');
  }

  @handleError(networkError())
  async logout() {
    await authApi.logout();

    store.actions.user.clearUser();

    appRouter.go('/sign-in');
  }
}

export const authController = new AuthController();
