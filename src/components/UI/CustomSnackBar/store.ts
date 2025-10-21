import { create } from 'zustand';

/**
 * Примеры использования улучшенной системы уведомлений:
 *
 * // Уведомление об успехе в центре сверху
 * useSnackStore.getState().setMessage('Данные сохранены!', 'success', 'top-center');
 *
 * // Уведомление об ошибке справа снизу
 * useSnackStore.getState().setError('Ошибка загрузки', 'bottom-right');
 *
 * // Предупреждение слева сверху
 * useSnackStore.getState().setNotification('Внимание!', 'warning', 'top-left');
 *
 * // Информационное сообщение в центре снизу
 * useSnackStore.getState().setNotification('Новая версия доступна', 'info', 'bottom-center');
 */

type NotificationType = 'success' | 'error' | 'info' | 'warning';
type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

type SnackStoreState = {
  message: string | null;
  error: string | null;
  type: NotificationType | null;
  position: NotificationPosition;
  setMessage: (
    msg: string | null,
    type?: NotificationType,
    position?: NotificationPosition,
  ) => void;
  setError: (msg: string | null, position?: NotificationPosition) => void;
  setNotification: (
    msg: string | null,
    type: NotificationType,
    position?: NotificationPosition,
  ) => void;
};

export const useSnackStore = create<SnackStoreState>((set) => ({
  message: null,
  error: null,
  type: null,
  position: 'top-right',
  setMessage: (msg, type = 'success', position = 'top-right') =>
    set({ message: msg, type, position }),
  setError: (errorMsg, position = 'top-right') => set({ error: errorMsg, type: 'error', position }),
  setNotification: (msg, type, position = 'top-right') =>
    set({ message: msg, error: type === 'error' ? msg : null, type, position }),
}));
