import { useEffect } from 'react';
import { useChatsStore } from '@/store/chatsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { authAxiosInstance } from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';

import { Subscription, PublicationContext, SubscriptionErrorContext } from 'centrifuge';
import { IChat, IMessage } from '@/types';

export const usePersonalSubscription = () => {
  const { centrifuge, setError } = useChatsStore();
  const queryClient = useQueryClient();

  // Personal channel subscription for global updates
  useEffect(() => {
    const user = useAuthStore.getState().user;
    if (!user || !centrifuge) return;

    let isCancelled = false;
    let sub: Subscription | null = null;

    const setupPersonalSubscription = async () => {
      try {
        const channel = `personal#${user.id}`;

        // 1. Cleanup existing subscription if any
        const existingSub = centrifuge.getSubscription(channel);
        if (existingSub) {
          await existingSub.unsubscribe();
          centrifuge.removeSubscription(existingSub);
        }

        if (isCancelled) return;

        // 2. Get token
        const { data } = await authAxiosInstance.post(`/auth/centrifugo/subscribe`, {
          channel,
        });

        if (isCancelled) return;

        if (!data.token) {
          throw new Error('Не удалось получить токен подписки для личного канала');
        }

        // 3. Double check existing subscription
        const currentSub = centrifuge.getSubscription(channel);
        if (currentSub) {
          await currentSub.unsubscribe();
          centrifuge.removeSubscription(currentSub);
        }

        // 4. Create subscription
        sub = centrifuge.newSubscription(channel, {
          token: data.token,
        });

        // 5. Setup listeners
        sub.on('publication', (ctx: PublicationContext) => {
          const message = (ctx.data || ctx) as IMessage;

          // Update React Query cache to move chat to top and update last message
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData(['chats'], (oldData: any) => {
            if (!oldData?.pages) return oldData;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newPages = oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.map((chat: IChat) => {
                if (chat.id === message.chat_id) {
                  return {
                    ...chat,
                    last_message: message,
                    updated_at: message.created_at, // Update timestamp to sort by it
                  };
                }
                return chat;
              }),
            }));

            return { ...oldData, pages: newPages };
          });
        });

        sub.on('error', (ctx: SubscriptionErrorContext) => {
          console.error(`Subscription error for channel ${channel}:`, ctx);
        });

        // 6. Subscribe
        if (!isCancelled) {
          await sub.subscribe();
        } else {
          if (sub) {
            centrifuge.removeSubscription(sub);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to subscribe to personal channel:', error);
          // Optional: setError('Failed to subscribe to personal channel');
        }
      }
    };

    setupPersonalSubscription();

    return () => {
      isCancelled = true;
      if (sub) {
        sub.unsubscribe();
        if (centrifuge) {
          centrifuge.removeSubscription(sub);
        }
      }
    };
  }, [centrifuge, queryClient, setError]);
};
