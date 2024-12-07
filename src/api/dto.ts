export interface SignupDto {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninDto {
  login: string;
  password: string;
}

export interface SignupResponseSuccessDto {
  id: number;
}

export interface ErrorResponseDto {
  reason: string;
}

export interface UserResponseDto {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface LastMessageDto {
  user: UserResponseDto;
  time: string;
  content: string;
}

export interface ChatsResponseDto {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessageDto;
}

export interface CreateChatRequestDto {
  title: string;
}

export interface CreateChatResponseDto {
  id: number;
}

export interface ChatDeleteRequestDto {
  chatId: number;
}

export interface DeleteChatResponseDto {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
}

export interface ChatArchiveRequestDto {
  chatId: number;
}

export interface ChatArchiveResponseDto {
  userId: number;
  result: ChatsResponseDto;
}

export interface FileDto {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface BaseMessageDto {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string;
}

export interface TextMessageDto extends BaseMessageDto {
  type: 'message';
  content: string;
}

export interface FileMessageDto extends BaseMessageDto {
  type: 'file';
  content: number;
  file: FileDto;
}

export type ChatMessageDto = TextMessageDto | FileMessageDto;

export interface UnreadCountResponseDto {
  unread_count: number;
}

export interface UsersRequestDto {
  users: number[];
  chatId: number;
}

export interface ChatMessagesTokenResponseDto {
  token: string;
}

export interface UserUpdateRequestDto {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordRequestDto {
  oldPassword: string;
  newPassword: string;
}

export interface FindUserRequestDto {
  login: string;
}
