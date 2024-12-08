import { api } from './api';
import {
  ChatsResponseDto,
  CreateChatRequestDto,
  CreateChatResponseDto,
  ChatDeleteRequestDto,
  DeleteChatResponseDto,
  ChatMessageDto,
  ChatArchiveRequestDto,
  ChatArchiveResponseDto,
  UserResponseDto,
  UnreadCountResponseDto,
  UsersRequestDto,
  ChatMessagesTokenResponseDto,
} from './dto';

interface GetChatsOptions {
  offset?: number;
  limit?: number;
  title?: string;
}

interface GetChatUsersOptions extends GetChatsOptions {
  name?: string;
  email?: string;
}

class ChatApi {
  async getChats(options: GetChatsOptions = {}): Promise<ChatsResponseDto[]> {
    return api
      .get('/chats', { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async createChat(data: CreateChatRequestDto): Promise<CreateChatResponseDto> {
    return api
      .post('/chats', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async deleteChat(data: ChatDeleteRequestDto): Promise<DeleteChatResponseDto> {
    return api
      .delete('/chats', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async getChatFiles(chatId: number): Promise<ChatMessageDto[]> {
    return api
      .get(`/chats/${chatId}/files`)
      .then((response) => JSON.parse(response.responseText));
  }

  async getArchivedChats(
    options: GetChatsOptions = {},
  ): Promise<ChatsResponseDto[]> {
    return api
      .get('/chats/archive', { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async archiveChat(
    data: ChatArchiveRequestDto,
  ): Promise<ChatArchiveResponseDto> {
    return api
      .post('/chats/archive', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async unarchiveChat(
    data: ChatArchiveRequestDto,
  ): Promise<ChatArchiveResponseDto> {
    return api
      .post('/chats/unarchive', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async getCommonChats(chatId: number): Promise<ChatsResponseDto[]> {
    return api
      .get(`/chats/${chatId}/common`)
      .then((response) => JSON.parse(response.responseText));
  }

  async getChatUsers(
    chatId: number,
    options: GetChatUsersOptions = {},
  ): Promise<UserResponseDto[]> {
    return api
      .get(`/chats/${chatId}/users`, { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async getNewMessagesCount(chatId: number): Promise<UnreadCountResponseDto> {
    return api
      .get(`/chats/new/${chatId}`)
      .then((response) => JSON.parse(response.responseText));
  }

  async updateChatAvatar(
    chatId: number,
    avatar: File,
  ): Promise<ChatsResponseDto> {
    const formData = new FormData();
    formData.append('chatId', chatId.toString());
    formData.append('avatar', avatar);

    return api
      .put('/chats/avatar', { data: formData })
      .then((response) => JSON.parse(response.responseText));
  }

  async addUsersToChat(data: UsersRequestDto): Promise<void> {
    return api.put('/chats/users', { data }).then(() => {});
  }

  async removeUsersFromChat(data: UsersRequestDto): Promise<void> {
    return api.delete('/chats/users', { data }).then(() => {});
  }

  async requestChatToken(
    chatId: number,
  ): Promise<ChatMessagesTokenResponseDto> {
    return api
      .post(`/chats/token/${chatId}`)
      .then((response) => JSON.parse(response.responseText));
  }
}

export const chatApi = new ChatApi();
