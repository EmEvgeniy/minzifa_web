import React from 'react';
import { FaArrowLeft, FaComments } from 'react-icons/fa';
import { IChat } from '@/types';
import ImageWithFallback from '../UI/ImageWithFallback/ImageWithFallback';

interface ChatHeaderProps {
  chat: IChat;
  isMobile: boolean;
  onBack?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, isMobile, onBack }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-green-800 to-green-900 text-white flex items-center gap-4 shadow-lg border-b border-white/10">
      {isMobile && onBack && (
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors duration-200"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
      )}

      <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white/20">
        {chat.tourist?.avatar?.file ? (
          <ImageWithFallback
            src={chat.tourist.avatar.file}
            alt={chat.tourist.avatar.alt_text || 'Avatar'}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <FaComments className="text-white w-7 h-7" />
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold mb-1 tracking-wide">
          {chat.tourist?.name || 'Неизвестный пользователь'}
        </h1>
        <p className="text-sm opacity-90 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          Менеджер: {chat.manager?.name || 'Неизвестный менеджер'}
        </p>
      </div>
    </div>
  );
};
