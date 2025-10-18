import React from 'react';
import { IChat } from '@/types';
import { ChatListItem } from './index';
import { PaginatedData } from '@/types';

interface ChatListProps {
  chats: PaginatedData<IChat>;
  selectedChat: IChat | null;
  onChatSelect: (chat: IChat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onChatSelect }) => {
  // Обеспечиваем, что chats существует всегда
  const safeChats = chats || { data: [] };
  const chatCount = safeChats.data?.length || 0;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-green-800 to-green-900 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Чаты</h2>
            <p className="text-sm opacity-90 mt-1">Вашиactive разговоры</p>
            {chatCount > 0 && (
              <span className="text-xs opacity-75 block mt-1">
                {chatCount} {chatCount === 1 ? 'чат' : chatCount < 5 ? 'чата' : 'чатов'}
              </span>
            )}
          </div>
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg">💬</span>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {chatCount > 0 ? (
          <div className="divide-y divide-gray-200">
            {safeChats.data.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChat?.id === chat.id}
                onClick={() => onChatSelect(chat)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📭</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Нет активных чатов</h3>
              <p className="text-sm text-gray-400 text-center max-w-xs">
                Здесь появятся ваши разговоры с менеджером поддержки
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
