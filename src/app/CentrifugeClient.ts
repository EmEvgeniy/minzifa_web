import { IMessage } from '@/types';
import { Centrifuge, Subscription } from 'centrifuge';
import { BASE_API_PATH } from '@/constants';
import axiosInstance from '../utils/axios';

export const initCentrifugo = async (): Promise<Centrifuge> => {
  try {
    const { data } = await axiosInstance.post(`${BASE_API_PATH}/centrifugo/token`);

    if (!data.token) {
      throw new Error('Не удалось получить токен для Centrifuge');
    }

    const wsUrl = process.env.NEXT_PUBLIC_CENTRIFUGE_URL;

    const centrifuge = new Centrifuge(wsUrl as string, {
      token: data.token,
    });

    centrifuge.on('disconnected', (ctx) => {
      setTimeout(() => {
        console.log('Attempting to reconnect to Centrifuge...');
        centrifuge.connect();
      }, 5000);
    });

    return centrifuge;
  } catch (error) {
    console.error('Failed to initialize Centrifuge:', error);
    throw error;
  }
};

export const subscribeToChat = async (
  centrifuge: Centrifuge,
  chatId: string,
  onMessage: (msg: IMessage) => void,
): Promise<Subscription> => {
  try {
    const channel = `chat#${chatId}`;

    const existingSub = centrifuge.getSubscription(channel);
    if (existingSub) {
      console.log(`Subscription to ${channel} already exists, removing it first`);
      await existingSub.unsubscribe();
      centrifuge.removeSubscription(existingSub);
    }

    const { data } = await axiosInstance.post(`${BASE_API_PATH}/centrifugo/subscribe`, { channel });

    if (!data.token) {
      throw new Error('Не удалось получить токен подписки для канала');
    }

    const sub = centrifuge.newSubscription(channel, {
      token: data.token,
    });

    // Обработка событий подписки
    sub.on('publication', (ctx) => {
      try {
        onMessage(ctx.data);
      } catch (error) {
        console.error('Error parsing or handling message:', error);
      }
    });

    sub.on('error', (ctx) => {
      console.error(`Subscription error for channel ${channel}:`, ctx);
    });

    sub.on('subscribed', (ctx) => {
      console.log(`Subscribed to channel ${channel}`, ctx);
    });

    sub.on('unsubscribed', (ctx) => {
      console.log(`Unsubscribed from channel ${channel}`, ctx);
    });

    await sub.subscribe();

    return sub;
  } catch (error) {
    console.error(`Failed to subscribe to chat ${chatId}:`, error);
    throw error;
  }
};
