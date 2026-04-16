'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IChat, PaginatedData } from '@/types';
import { InfiniteData } from '@tanstack/react-query';
import { ChatListItem } from './ChatListItem';

interface ChatListProps {
  chats: InfiniteData<PaginatedData<IChat>>;
  selectedChat: IChat | null;
  onChatSelect: (chat: IChat) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const ChatsList = ({
  chats,
  selectedChat,
  onChatSelect,
  searchQuery,
  onSearchChange,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: ChatListProps) => {
  const t = useTranslations();
  const observerTarget = useRef<HTMLDivElement>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // IntersectionObserver для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Собираем все чаты из всех страниц
  const allChats = chats?.pages?.flatMap(page => page.data) || [];
  const chatCount = chats?.pages?.[0]?.meta?.total || 0;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">{t('chat.chatsTitle')}</h2>
            <p className="text-sm opacity-90 mt-1">{t('chat.activeChatsSubtitle')}</p>
            {chatCount > 0 && (
              <span className="text-xs opacity-75 block mt-1">
                {chatCount} {t(`chat.chatForms.${chatCount === 1 ? 'one' : chatCount < 5 ? 'few' : 'many'}`)}
              </span>
            )}
          </div>
        </div>

        {/* Поле поиска */}
        <div className="relative">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder={t('chat.searchPlaceholder')}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {chatCount > 0 ? (
          <>
            <div className="divide-y divide-gray-300">
              {allChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selectedChat?.id === chat.id}
                  onClick={() => onChatSelect(chat)}
                />
              ))}
            </div>

            {/* Элемент для наблюдения (IntersectionObserver) */}
            <div ref={observerTarget} className="h-4" />

            {/* Индикатор загрузки */}
            {isFetchingNextPage && (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">{t('chat.noActiveChats')}</h3>
              <p className="text-sm text-gray-400 text-center max-w-xs">
                {t('chat.noChatsHint')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
