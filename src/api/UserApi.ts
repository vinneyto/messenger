import { api } from './api';
import {
  UserUpdateRequestDto,
  UserResponseDto,
  ChangePasswordRequestDto,
  FindUserRequestDto,
} from './dto';

class UserApi {
  async updateProfile(data: UserUpdateRequestDto): Promise<UserResponseDto> {
    return api
      .put('/user/profile', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async updateProfileAvatar(avatar: File): Promise<UserResponseDto> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return api
      .put('/user/profile/avatar', { data: formData })
      .then((response) => JSON.parse(response.responseText));
  }

  async changePassword(data: ChangePasswordRequestDto): Promise<void> {
    return api.put('/user/password', { data }).then(() => {});
  }

  async findUser(data: FindUserRequestDto): Promise<UserResponseDto[]> {
    return api
      .post('/user/search', { data })
      .then((response) => JSON.parse(response.responseText));
  }
}

export const userApi = new UserApi();
