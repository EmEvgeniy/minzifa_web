import React from 'react';
import { IChat, IMessage, PaginatedData } from '@/types';
import { ChatHeader, ChatMessages, ChatInput } from './index';

interface ChatWindowProps {
  chat: IChat;
  messages: PaginatedData<IMessage>;
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isMobile: boolean;
  onBack?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  messages,
  message,
  onMessageChange,
  onSendMessage,
  isMobile,
  onBack,
}) => {
  return (
    <div className="flex-1 flex flex-col rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
      <ChatHeader chat={chat} isMobile={isMobile} onBack={onBack} />

      <ChatMessages messages={messages} />

      <div className="border-t border-gray-200"></div>

      <ChatInput
        message={message}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};
