import { HTTPTransport } from '../core';
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

export class ChatApi {
  constructor(private readonly transport: HTTPTransport) {}

  async getChats(options: GetChatsOptions = {}): Promise<ChatsResponseDto[]> {
    return this.transport
      .get('/chats', { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async createChat(data: CreateChatRequestDto): Promise<CreateChatResponseDto> {
    return this.transport
      .post('/chats', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async deleteChat(data: ChatDeleteRequestDto): Promise<DeleteChatResponseDto> {
    return this.transport
      .delete('/chats', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async getChatFiles(chatId: number): Promise<ChatMessageDto[]> {
    return this.transport
      .get(`/chats/${chatId}/files`)
      .then((response) => JSON.parse(response.responseText));
  }

  async getArchivedChats(
    options: GetChatsOptions = {},
  ): Promise<ChatsResponseDto[]> {
    return this.transport
      .get('/chats/archive', { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async archiveChat(
    data: ChatArchiveRequestDto,
  ): Promise<ChatArchiveResponseDto> {
    return this.transport
      .post('/chats/archive', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async unarchiveChat(
    data: ChatArchiveRequestDto,
  ): Promise<ChatArchiveResponseDto> {
    return this.transport
      .post('/chats/unarchive', { data })
      .then((response) => JSON.parse(response.responseText));
  }

  async getCommonChats(chatId: number): Promise<ChatsResponseDto[]> {
    return this.transport
      .get(`/chats/${chatId}/common`)
      .then((response) => JSON.parse(response.responseText));
  }

  async getChatUsers(
    chatId: number,
    options: GetChatUsersOptions = {},
  ): Promise<UserResponseDto[]> {
    return this.transport
      .get(`/chats/${chatId}/users`, { data: options })
      .then((response) => JSON.parse(response.responseText));
  }

  async getNewMessagesCount(chatId: number): Promise<UnreadCountResponseDto> {
    return this.transport
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

    return this.transport
      .put('/chats/avatar', { data: formData })
      .then((response) => JSON.parse(response.responseText));
  }

  async addUsersToChat(data: UsersRequestDto): Promise<void> {
    return this.transport.put('/chats/users', { data }).then(() => {});
  }

  async removeUsersFromChat(data: UsersRequestDto): Promise<void> {
    return this.transport.delete('/chats/users', { data }).then(() => {});
  }

  async requestChatToken(
    chatId: number,
  ): Promise<ChatMessagesTokenResponseDto> {
    return this.transport
      .post(`/chats/token/${chatId}`)
      .then((response) => JSON.parse(response.responseText));
  }
}