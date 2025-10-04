import { IMessage } from '@/types';
import axios, { BASE_API_PATH } from '../api/axios';
import { Centrifuge, Subscription } from 'centrifuge';

export const initCentrifugo = async (): Promise<Centrifuge> => {
  try {
    const { data } = await axios.post(`${BASE_API_PATH}/centrifugo/token`);

    if (!data.token) {
      throw new Error('Не удалось получить токен для Centrifuge');
    }

    // Хардкод WebSocket URL
    const wsUrl = 'wss://centrifugo.minzifatravel.com/connection/websocket';

    const centrifuge = new Centrifuge(wsUrl, {
      token: data.token,
    });

    // Обработка ошибок подключения
    centrifuge.on('connecting', (ctx) => {
      console.log('Centrifuge connecting:', ctx);
    });

    centrifuge.on('connected', (ctx) => {
      console.log('Centrifuge connected:', ctx);
    });

    centrifuge.on('error', (ctx) => {
      console.error('Centrifuge connection error:', ctx);
    });

    centrifuge.on('disconnected', (ctx) => {
      console.log('Centrifuge disconnected:', ctx);
      // Автоматическое переподключение через 5 секунд с экспоненциальным бэк-оффом
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

    const { data } = await axios.post(`${BASE_API_PATH}/centrifugo/subscribe`, { channel });

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
        console.error('Error handling message:', error);
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
