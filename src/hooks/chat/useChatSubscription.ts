import { useEffect } from 'react';
import { useChatsStore } from '@/store/chatsStore';
import { authAxiosInstance } from '@/utils/axios';
import { Subscription, PublicationContext, SubscriptionErrorContext } from 'centrifuge';

export const useChatSubscription = () => {
  const { selectedChat, centrifuge, setSubscription, setError, addMessage } = useChatsStore();

  useEffect(() => {
    if (!selectedChat || !centrifuge) return;

    let isCancelled = false;
    let sub: Subscription | null = null;

    const setupSubscription = async () => {
      try {
        const channel = `chat#${selectedChat.id}`;

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
          throw new Error('Не удалось получить токен подписки для канала');
        }

        // 3. Double check existing subscription before creating new one
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
          const message = ctx.data || ctx;
          addMessage(message);
        });

        sub.on('error', (ctx: SubscriptionErrorContext) => {
          console.error(`Subscription error for channel ${channel}:`, ctx);
        });

        // 6. Subscribe
        if (!isCancelled) {
          await sub.subscribe();
          setSubscription(sub);
        } else {
          centrifuge.removeSubscription(sub);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to subscribe to chat:', error);
          setError('Failed to subscribe to chat');
        }
      }
    };

    setupSubscription();

    return () => {
      isCancelled = true;
      if (sub) {
        sub.unsubscribe();
        if (centrifuge) {
          centrifuge.removeSubscription(sub);
        }
      } else {
        if (selectedChat && centrifuge) {
          const channel = `chat#${selectedChat.id}`;
          const existing = centrifuge.getSubscription(channel);
          if (existing) {
            existing.unsubscribe();
            centrifuge.removeSubscription(existing);
          }
        }
      }
      setSubscription(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?.id, centrifuge, setSubscription, setError, addMessage]);
};
