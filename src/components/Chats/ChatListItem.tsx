import React from 'react';
import { FaComments } from 'react-icons/fa';
import Image from 'next/image';
import { IChat } from '@/types';

interface ChatListItemProps {
  chat: IChat;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 transition-all duration-200 hover:translate-x-1 hover:shadow-md border-b border-gray-200 ${
        isSelected
          ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-800 rounded-r-lg'
          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {chat.has_unread_messages && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
          )}
          <div className="w-12 h-12 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            {chat.tourist?.avatar?.file ? (
              <Image
                src={chat.tourist.avatar.file}
                alt={chat.tourist.avatar.alt_text || 'Avatar'}
                width={44}
                height={44}
                className="rounded-full"
              />
            ) : (
              <FaComments className="text-white w-6 h-6" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-green-800 text-sm mb-1 truncate">
            {chat.tourist?.name || 'Неизвестный пользователь'}
          </h3>
          <p className="text-gray-600 text-xs truncate leading-relaxed">
            {chat.lastMessage?.message || 'Нет сообщений'}
          </p>
        </div>

        <div className="ml-3 text-right min-w-[60px]">
          <p className="text-gray-500 text-xs mb-1">
            {new Date(chat.last_message_at).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {chat.new_messages_count && chat.new_messages_count > 0 && (
            <div className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {chat.new_messages_count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
