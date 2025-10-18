# Архитектура клиентского приложения Minzifa Travel

## Обзор

Клиентское приложение Minzifa Travel построено на базе Next.js 15 с использованием современных технологий и лучших практик разработки.

## Структура проекта

```
src/
├── api/                    # API слой
│   ├── axios.ts           # Конфигурация axios клиентов
│   ├── get.api.ts         # React Query хуки для GET запросов
│   ├── post.api.ts        # React Query хуки для POST запросов
│   └── index.ts           # Централизованные экспорты API
├── app/                   # Next.js App Router
│   └── [locale]/         # Интернационализация
├── components/            # React компоненты
│   ├── UI/               # Переиспользуемые UI компоненты
│   ├── About/            # Страницы приложения
│   └── index.ts          # Экспорты компонентов
├── hooks/                # Кастомные React хуки
├── layouts/              # Layout компоненты
├── providers/            # React Context провайдеры
├── store/                # Управление состоянием (Zustand)
│   ├── useAuthStore.ts   # Аутентификация
│   ├── bookingStore.ts   # Бронирование
│   ├── chatsStore.ts     # Чаты
│   ├── contacts.ts       # Контактная информация
│   ├── index.ts          # Централизованные экспорты store
│   └── ...
├── types/                # TypeScript типы
│   ├── common.ts         # Общие типы
│   ├── routing.ts        # Типы роутинга
│   ├── auth.ts           # Типы аутентификации
│   ├── orders.ts         # Типы заказов
│   ├── chat.ts           # Типы чатов
│   ├── tours.ts          # Типы туров
│   └── index.ts          # Централизованные экспорты типов
├── utils/                # Утилиты и хелперы
│   ├── config.ts         # Конфигурация приложения
│   ├── utils.ts          # Общие утилиты
│   ├── serverApi.ts      # API утилиты для серверных компонентов
│   └── index.ts          # Централизованные экспорты утилит
├── validation/           # Схемы валидации (Zod)
└── middleware.ts         # Next.js middleware
```

## Ключевые технологии

### Frontend Framework
- **Next.js 15** - React фреймворк с App Router
- **React 19** - Библиотека для построения пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript

### Стилизация
- **Tailwind CSS** - Утилитарный CSS фреймворк
- **Styled Components** - CSS-in-JS библиотека

### Управление состоянием
- **Zustand** - Легковесное решение для управления состоянием
- **React Query (TanStack Query)** - Серверное состояние и кеширование

### Формы и валидация
- **React Hook Form** - Производительная работа с формами
- **Zod** - Схемы валидации TypeScript

### Интернационализация
- **Next Intl** - Интернационализация для Next.js

### Дополнительные библиотеки
- **Axios** - HTTP клиент
- **Framer Motion** - Анимации
- **Date-fns** - Работа с датами
- **clsx** - Условные классы

## Архитектурные принципы

### Разделение ответственности

1. **API слой** (`src/api/`)
   - Централизованная конфигурация HTTP клиентов
   - Перехватчики запросов и ответов
   - React Query хуки для серверного состояния

2. **Управление состоянием** (`src/store/`)
   - Zustand store для клиентского состояния
   - Централизованные экспорты через `index.ts`
   - Разделение по доменам (аутентификация, заказы, чаты и т.д.)

3. **Типы** (`src/types/`)
   - Модульная организация типов по доменам
   - Централизованные экспорты через `index.ts`
   - Разделение на логические группы

4. **Компоненты** (`src/components/`)
   - UI компоненты в отдельной папке
   - Структурированные по функциональным областям
   - Консистентное именование файлов

### Импорты и экспорты

Используйте централизованные экспорты для импортов:

```typescript
// Типы
import { ITourist, IOrder, PaginatedData } from '@/types';

// Store
import { useAuthStore, useBookingStore } from '@/store';

// API
import { useGetQuery, usePostMutation, privateAxios } from '@/api';

// Utils
import { cn, formatDate, getApiUrl } from '@/utils';
```

## Структура типов

### Модульная организация типов

```typescript
// Общие типы
export interface IMediaData {
  id: number;
  file: string | null;
  alt_text: string | null;
}

// Типы аутентификации
export interface ITourist {
  id: number;
  name: string | null;
  email: string | null;
  avatar: IMediaData | null;
}

// Типы заказов
export enum OrderStatusEnum {
  AWAITING_CONFIRMATION = 'awaiting_confirmation',
  PAYMENT_CONFIRMED = 'payment_confirmed',
}

// Типы чатов
export enum ChatStatusEnum {
  OPEN = 'open',
  CLOSED = 'closed',
}
```

## Управление состоянием

### Структура store файлов

Каждый store следует единой структуре:

```typescript
export interface StoreState {
  // State properties
  data: T | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchData: () => Promise<void>;
  updateData: (data: T) => void;
  clearError: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  data: null,
  isLoading: false,
  error: null,

  // Actions implementation
}));
```

### Использование store

```typescript
import { useAuthStore } from '@/store';

function LoginComponent() {
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // JSX
  );
}
```

## API слой

### Конфигурация клиентов

```typescript
// Публичный клиент (без аутентификации)
export const publicAxios = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Приватный клиент (с аутентификацией)
export const privateAxios = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});
```

### React Query хуки

```typescript
// GET запросы
export const useGetQuery = <T>({
  key,
  url,
  page,
  perPage,
}: GetQueryType) => {
  return useQuery<T>({
    queryKey: [...key, page, perPage],
    queryFn: async () => {
      // Implementation
    },
  });
};

// POST запросы
export const usePostMutation = <TData, TVariables>(
  key: (string | number)[],
  onSuccessCallback?: (data: TData) => void,
) => {
  return useMutation<TData, AxiosError, MutationParams<TVariables>>({
    mutationKey: [...key],
    mutationFn: async ({ obj, endpoint }) => {
      // Implementation
    },
  });
};
```

## Компоненты

### Структура компонентов

```typescript
// UI компоненты
src/components/UI/
  ├── Button/
  │   ├── Button.tsx
  │   ├── Button.module.css (опционально)
  │   └── index.ts
  ├── Input/
  └── ...

// Функциональные компоненты
src/components/
  ├── Auth/
  ├── Booking/
  ├── Tours/
  └── ...
```

### Соглашения именования

- Компоненты используют PascalCase
- Файлы именуются соответственно компоненту
- Каждый компонент экспортируется через index.ts

## Утилиты

### Конфигурация приложения

```typescript
export const appConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    yandexId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID,
  },
};
```

### Общие утилиты

```typescript
// Объединение классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Форматирование дат
export function formatDate(
  date: string,
  locale: string,
  formatType: string = 'MMM d, yyyy'
) {
  // Implementation
}
```

## Лучшие практики

### Импорты
- Используйте абсолютные импорты с алиасом `@/`
- Группируйте импорты по типу (библиотеки, внутренние модули)
- Используйте централизованные экспорты

### Типизация
- Все компоненты, функции и переменные должны быть типизированы
- Используйте строгий режим TypeScript
- Создавайте переиспользуемые типы

### Производительность
- Используйте React.memo для оптимизации ререндеров
- Ленивая загрузка компонентов с Suspense
- Оптимизация изображений с Next.js Image

### Качество кода
- Соблюдайте правила ESLint и Prettier
- Пишите тесты для критически важных функций
- Документируйте сложную бизнес-логику

## Расширение архитектуры

При добавлении новых модулей следуйте существующей структуре:

1. Создайте типы в соответствующем модуле `src/types/`
2. Добавьте store в `src/store/` если нужно локальное состояние
3. Создайте API функции в `src/api/`
4. Добавьте компоненты в соответствующие папки
5. Обновите централизованные экспорты

Эта архитектура обеспечивает масштабируемость, поддерживаемость и высокое качество кода.