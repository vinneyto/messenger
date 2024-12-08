import { api } from './api';
import {
  SignupDto,
  SigninDto,
  SignupResponseSuccessDto,
  UserResponseDto,
} from './dto';

class AuthApi {
  async signup(data: SignupDto): Promise<SignupResponseSuccessDto> {
    return api
      .post('/auth/signup', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async signin(data: SigninDto): Promise<void> {
    return api.post('/auth/signin', { data }).then(() => {});
  }

  async getUser(): Promise<UserResponseDto> {
    return api
      .get('/auth/user')
      .then((response) => JSON.parse(response.responseText));
  }

  async logout(): Promise<void> {
    return api.post('/auth/logout').then(() => {});
  }
}

export const authApi = new AuthApi();
