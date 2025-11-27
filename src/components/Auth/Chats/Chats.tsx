'use client';

import React, { useEffect, useState } from 'react';
import { useChats } from '@/hooks/useChats';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IChat, PaginatedData } from '@/types';
import { Chat } from './Chat';
import { ChatsList } from './ChatsList';
import { useGetInfiniteQuery } from '@/api';
import Loader from '@/components/UI/Loader/Loader';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const Chats = () => {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        initializeWebSocket,
        selectedChat,
        handleChatSelect,
        handleSendMessage,
    } = useChats();

    const {
        data: chats,
        isLoading,
        isFetched,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetInfiniteQuery<IChat>({
        key: ['chats'],
        url: '/chats',
        perPage: '10',
        searchItem: searchQuery,
        withLocale: false,
    });

    useEffect(() => {
        initializeWebSocket();
    }, [initializeWebSocket]);

    useEffect(() => {
        const chatId = searchParams.get('id');
        if (chatId && chats) {
            const allChats = chats.pages?.flatMap(page => page.data) || [];
            const chat = allChats.find(c => c.id.toString() === chatId);
            if (chat && selectedChat?.id !== chat.id) {
                handleChatSelect(chat);
            }
        } else if (!chatId && selectedChat) {
            handleChatSelect(null);
        }
    }, [searchParams, chats, selectedChat, handleChatSelect]);

    const handleBackToList = () => {
        router.push(pathname, { scroll: false });
        handleChatSelect(null);
    };

    const handleChatSelectWithUrl = (chat: IChat | null) => {
        handleChatSelect(chat);
        if (chat) {
            router.push(`${pathname}?id=${chat.id}`, { scroll: false });
        } else {
            router.push(pathname, { scroll: false });
        }
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen pt-[100px]">
                <Loader />
            </div>
        );
    }

    return isFetched && chats && (
        <div className="mt-[150px] mb-[20px]">
            <div className="container px-4 h-[calc(100vh-200px)]">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex h-full relative">
                    {!isMobile && (
                        <div className="w-96 border-r border-gray-200">
                            <ChatsList
                                chats={chats}
                                selectedChat={selectedChat}
                                onChatSelect={handleChatSelectWithUrl}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                fetchNextPage={fetchNextPage}
                                hasNextPage={hasNextPage || false}
                                isFetchingNextPage={isFetchingNextPage}
                            />
                        </div>
                    )}

                    {isMobile && isDrawerOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleDrawer}></div>
                    )}

                    {isMobile && (
                        <div className={`fixed top-[150px] left-0 h-[calc(100vh-160px)] w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            <ChatsList
                                chats={chats}
                                selectedChat={selectedChat}
                                onChatSelect={(chat) => {
                                    handleChatSelectWithUrl(chat);
                                    setIsDrawerOpen(false);
                                }}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                fetchNextPage={fetchNextPage}
                                hasNextPage={hasNextPage || false}
                                isFetchingNextPage={isFetchingNextPage}
                            />
                        </div>
                    )}

                    <div className={`flex-1 flex flex-col ${isMobile ? 'w-full' : ''}`}>
                        {selectedChat ? (
                            <>
                                {isMobile && (
                                    <button
                                        onClick={toggleDrawer}
                                        className="absolute top-4 left-4 z-30 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                                    >
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                    </button>
                                )}
                                <Chat
                                    isMobile={isMobile}
                                    onBack={handleBackToList}
                                    onSendMessage={handleSendMessage}
                                />
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                {isMobile ? (
                                    <div className="text-center max-w-md">
                                        <button
                                            onClick={toggleDrawer}
                                            className="mb-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            {t('chat.openChatList')}
                                        </button>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('chat.selectChat')}</h2>
                                        <p className="text-gray-600 text-lg">
                                            {t('chat.selectChatHint')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center max-w-xs">
                                        <h2 className="text-base font-bold text-gray-800 mb-3">
                                            {t('chat.selectChat')}
                                        </h2>
                                        <p className="text-gray-600 text-xs">
                                            {t('chat.selectChatHint')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;
