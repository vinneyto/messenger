import { authApi, SigninDto } from '../api';
import { store } from '../store';

class AuthController {
  async login(data: SigninDto) {
    await authApi.signin(data);

    const user = await authApi.getUser();

    store.actions.user.setUser(user);
  }

  async logout() {
    await authApi.logout();

    store.actions.user.clearUser();
  }
}

export const authController = new AuthController();
