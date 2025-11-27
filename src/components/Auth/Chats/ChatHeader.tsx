import React from 'react';
import { FaChevronLeft, FaComments } from 'react-icons/fa';
import { IChat } from '@/types';
import Button from '@/components/UI/Button/Button';
import { useTranslations } from 'next-intl';
import { useChatsStore } from '@/store';

interface ChatHeaderProps {
  chat: IChat;
  onBack?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  const t = useTranslations('chat');

  const { setSelectedChat } = useChatsStore();

  return (
    <div className='flex flex-col'>
      <div className="p-3 border-b border-gray-200 flex items-center">
        <Button
          onClick={onBack}
          color='soft'
        >
          <FaChevronLeft size={16} />
        </Button>

        <div className='flex items-center justify-between gap-2 w-full'>
          <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            <FaComments className="text-white w-6 h-6" />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold mb-1 tracking-wide">
              {chat?.order?.order_name}
            </p>
          </div>
          <div>
            <Button
              to={`/orders/${chat?.order?.id}`}
              color="secondary"
              className="text-sm"
            >
              {t('chatHeader.actions')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
