// Типы для системы чатов и сообщений

export enum ChatTypeEnum {
  SUPPORT = 'support',
  ORDER = 'order',
  COMPLAINT = 'complaint',
}

export enum ChatStatusEnum {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export interface IMessage {
  id: number;
  chat_id: number;
  sender_type: 'App\\Models\\Manager' | 'App\\Models\\Tourist';
  sender_id: number;
  message_type: 'text' | 'image' | 'video' | 'file';
  message: string;
  file_path: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IChat {
  id: number;
  tourist: import('./auth').ITourist;
  manager: import('@/components/Auth/_types').IManager;
  order: import('./orders').IOrder;
  chat_type: ChatTypeEnum;
  status: ChatStatusEnum;
  last_message_at: Date;
  has_unread_messages: boolean;
  created_at: Date;
  updated_at: Date;
  lastMessage: IMessage;
  new_messages_count?: number;
  messages?: IMessage[];
}
