import { HTTPTransport } from '../core';
import {
  UserUpdateRequestDto,
  UserResponseDto,
  ChangePasswordRequestDto,
  FindUserRequestDto,
} from './dto';

export class UserApi {
  constructor(private readonly transport: HTTPTransport) {}

  async updateProfile(data: UserUpdateRequestDto): Promise<UserResponseDto> {
    return this.transport
      .put('/user/profile', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async updateProfileAvatar(avatar: File): Promise<UserResponseDto> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.transport
      .put('/user/profile/avatar', { data: formData })
      .then((response) => JSON.parse(response.responseText));
  }

  async changePassword(data: ChangePasswordRequestDto): Promise<void> {
    return this.transport.put('/user/password', { data }).then(() => {});
  }

  async findUser(data: FindUserRequestDto): Promise<UserResponseDto[]> {
    return this.transport
      .post('/user/search', { data })
      .then((response) => JSON.parse(response.responseText));
  }
}
