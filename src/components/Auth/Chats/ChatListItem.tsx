import React from 'react';
import { FaComments } from 'react-icons/fa';
import { IChat } from '@/types';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

interface ChatListItemProps {
  chat: IChat;
  isSelected: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 transition-all duration-200  
        ${isSelected
          ? 'bg-gradient-to-r from-gray-200 to-gray-100'
          : 'hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <FaComments size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-green-800 text-sm mb-1 truncate">
            {chat?.order?.order_name}
          </h2>
          <p className='text-xs font-medium text-gray-500 mb-2'>
            {chat?.manager?.name}
          </p>
          <p className="text-gray-600 text-xs truncate">
            {chat?.lastMessage?.message}
          </p>
        </div>
        {chat?.lastMessage?.created_at && <div>
          <p className="text-gray-600 text-xs truncate">
            {new Date(chat?.lastMessage?.created_at).toLocaleString()}
          </p>
        </div>}
      </div>
    </div>
  );
};
