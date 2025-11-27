'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IMessage } from '@/types';
import { useTranslations } from 'next-intl';

interface ChatMessagesProps {
  messages: IMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const t = useTranslations();
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
    if (isUserAtBottom && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [messages, isUserAtBottom]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      {messages && messages.length > 0 ? (
        messages?.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] min-w-[120px] p-4 rounded-2xl border transition-all duration-200 
              ${msg.sender_type === 'Manager'
                ? 'self-start bg-gray-50 text-gray-800 border-gray-200 rounded-bl-none'
                : 'self-end bg-[#e2fff4] text-gray-800 border-gray-200 rounded-br-none'
              }`}
          >
            {msg.sender_type === 'Manager' && <p className='text-xs font-medium text-gray-500 mb-2'>
              {msg?.sender?.name}
            </p>}
            <p className="break-words leading-relaxed text-sm">
              {msg.message}
            </p>
            <p
              className={`mt-2 text-xs font-medium text-gray-400`}
            >
              {msg.created_at && new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <p>{t('chat.noMessages')}</p>
            <p className="text-sm">{t('chat.startConversation')}</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
