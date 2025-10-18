'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IMessage } from '@/types';
import { PaginatedData } from '@/types';

interface ChatMessagesProps {
  messages: PaginatedData<IMessage>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px tolerance
      setIsUserAtBottom(isAtBottom);
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isUserAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserAtBottom]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {messages?.data && messages.data.length > 0 ? (
        messages.data.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`max-w-[75%] min-w-[120px] p-4 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-fadeIn ${
              msg.sender_type === 'App\\Models\\Manager'
                ? 'self-start bg-gradient-to-br from-white to-gray-50 text-gray-800 border-gray-200 rounded-br-sm'
                : 'self-end bg-gradient-to-br from-green-800 to-green-900 text-white rounded-bl-sm'
            }`}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <p className="break-words leading-relaxed text-sm">
              {msg.message || 'Сообщение не загружено'}
            </p>
            <p
              className={`mt-2 text-xs font-medium ${
                msg.sender_type === 'App\\Models\\Manager' ? 'text-gray-500' : 'text-gray-200'
              }`}
            >
              {msg.sender_type === 'App\\Models\\Manager' ? 'Менеджер поддержки' : 'Вы'} •{' '}
              {msg.created_at
                ? (msg.created_at instanceof Date
                    ? msg.created_at
                    : new Date(msg.created_at)
                  ).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Время неизвестно'}
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">💬</p>
            <p>Сообщений пока нет</p>
            <p className="text-sm">Начните разговор с менеджером</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
