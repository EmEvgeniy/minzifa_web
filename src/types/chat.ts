import { IManager } from '@/components/Auth/_types';
import { ITourist } from './auth';
import { IOrder } from './orders';

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
  sender: IManager | ITourist;
  sender_type: 'Manager' | 'Tourist';
  chat_id: number;
  message_type: 'text' | 'image' | 'video' | 'file';
  message: string;
  file_path: string;
  is_read: boolean;
  created_at: Date;
}

export interface IChat {
  id: number;
  tourist: ITourist;
  manager: IManager;
  order: IOrder;
  chat_type: ChatTypeEnum;
  status: ChatStatusEnum;
  has_unread_messages: boolean;
  created_at: Date;
  updated_at: Date;
  lastMessage: IMessage;
  new_messages_count?: number;
  messages?: IMessage[];
}
