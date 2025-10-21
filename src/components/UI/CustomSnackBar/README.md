# CustomSnackBar - Улучшенная система уведомлений

## Обзор

Компонент `CustomSnackBar` предоставляет современную систему уведомлений с поддержкой различных типов, позиций и красивых анимаций.

## Типы уведомлений

- **success** - Зеленые уведомления об успехе (✅)
- **error** - Красные уведомления об ошибках (❌)
- **warning** - Желтые/оранжевые предупреждения (⚠️)
- **info** - Синие информационные уведомления (ℹ️)

## Позиции размещения

- `top-right` - Сверху справа (по умолчанию)
- `top-left` - Сверху слева
- `bottom-right` - Снизу справа
- `bottom-left` - Снизу слева
- `top-center` - Сверху по центру
- `bottom-center` - Снизу по центру

## Примеры использования

```typescript
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';

// Уведомление об успехе в центре
useSnackStore.getState().setMessage('Данные сохранены!', 'success', 'top-center');

// Уведомление об ошибке справа снизу
useSnackStore.getState().setError('Ошибка загрузки', 'bottom-right');

// Предупреждение слева сверху
useSnackStore.getState().setNotification('Внимание!', 'warning', 'top-left');

// Информационное сообщение в центре снизу
useSnackStore.getState().setNotification('Новая версия доступна', 'info', 'bottom-center');
```

## Особенности

- ✅ Автоматическое скрытие через 4 секунды
- ✅ Красивые градиентные цвета и иконки
- ✅ Плавные анимации появления/исчезания с эффектом bounce
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Поддержка разных позиций размещения
- ✅ Backdrop для мобильных устройств
- ✅ Hover эффекты для кнопки закрытия

## Использование в Auth контроллере

```typescript
// В useAuthStore при успешной регистрации
useSnackStore.getState().setMessage(message, 'success');
```

## Кастомизация

Для добавления новых типов уведомлений или позиций:

1. Добавьте тип в `NotificationType`
2. Добавьте позицию в `NotificationPosition`
3. Обновите функции `getIcon` и `getStyles`
4. Добавьте позиционные стили в `getPositionStyles`