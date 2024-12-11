import { authApi, SigninDto, SignupDto } from '../api';
import { appRouter } from '../appRouter';
import { store } from '../store';

class AuthController {
  async login(data: SigninDto) {
    await authApi.signin(data);

    this.getUser();

    appRouter.go('/');
  }

  async getUser() {
    const user = await authApi.getUser();

    store.actions.user.setUser(user);

    return user;
  }

  async signup(data: SignupDto) {
    await authApi.signup(data);

    appRouter.go('/sign-in');
  }

  async logout() {
    await authApi.logout();

    store.actions.user.clearUser();

    appRouter.go('/sign-in');
  }
}

export const authController = new AuthController();
