import { HTTPTransport } from '../core';
import {
  SignupDto,
  SigninDto,
  SignupResponseSuccessDto,
  UserResponseDto,
} from './dto';

export class AuthApi {
  constructor(private readonly transport: HTTPTransport) {}

  async signup(data: SignupDto): Promise<SignupResponseSuccessDto> {
    return this.transport
      .post('/auth/signup', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async signin(data: SigninDto): Promise<void> {
    return this.transport.post('/auth/signin', { data }).then(() => {});
  }

  async getUser(): Promise<UserResponseDto> {
    return this.transport
      .get('/auth/user')
      .then((response) => JSON.parse(response.responseText));
  }

  async logout(): Promise<void> {
    return this.transport.post('/auth/logout').then(() => {});
  }
}
