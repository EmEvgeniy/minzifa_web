# 🌍 Minzifa Travel Website

Welcome to the official **Minzifa Travel** website — a modern, high-performance travel platform
built with [Next.js](https://nextjs.org/). This project aims to deliver an engaging and responsive
user experience, support international travelers, and maintain consistency and scalability through a
clean and maintainable codebase.

---

## ✨ Features

- ⚡ **Server-side Rendering (SSR)** for better performance and SEO
- 🧭 **Routing** with Next.js file-based structure
- 🎨 **Design System** with consistent layout and styling
- 📱 **Responsive** — optimized for mobile, tablet, and desktop
- 🌐 **Multilingual Support** — internationalized user experience
- 🧩 **Modular Architecture** — reusable components and clean separation of concerns

---

## 🛠 Tech Stack

- **Framework**: Next.js (React + TypeScript)
- **Styling**: Tailwind CSS / CSS Modules
- **Internationalization**: Next-i18next (or other i18n lib)
- **State Management**: React Context / Zustand (optional)
- **Linting & Formatting**: ESLint + Prettier
- **Version Control**: Git + Husky (hooks)
- **Commit Convention**: Conventional Commits with commitlint

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

### 2. Environment Setup (Optional)

Create `.env.local` file for custom configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
NEXT_PUBLIC_WS_URL="wss://centrifugo.minzifatravel.com/connection/websocket"
NEXT_PUBLIC_BASE_API="http://localhost"
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

| Variable               | Description                         | Default Value                                             |
| ---------------------- | ----------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_WS_URL`   | WebSocket URL for Centrifugo server | `wss://centrifugo.minzifatravel.com/connection/websocket` |
| `NEXT_PUBLIC_BASE_API` | Base URL for backend API            | `http://localhost`                                        |

**Note:** Currently using hardcoded values in code. Uncomment variables in `.env` file for better configuration management.

---

## 📜 Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint linter

---

## 🏗️ Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── app/            # Next.js App Router pages
│   ├── assets/         # Images and resources
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   └── api/            # API utilities
├── .env.example        # Example environment variables
└── next.config.ts      # Next.js configuration
```

---

## 🔧 Development

### API Integration
The client connects to Laravel backend API for data fetching and management.

### WebSocket Integration
Real-time updates through Centrifugo WebSocket connections for live data synchronization.

---

## 🧺 Commit Message Convention (`commit-msg` hook)

This project uses a `commit-msg` hook via **Husky** to enforce proper commit formatting with
**commitlint**. All commit messages **must** follow the
[Conventional Commits](https://www.conventionalcommits.org/) standard and include a JIRA task
reference.

### ✅ Required format:

```

<type>(CODE-<task number>): <commit message>

````

- `type` — type of change (must be from the list below)
- `CODE-123` — JIRA task ID
- `commit message` — short, imperative description starting with a lowercase letter

#### ✅ Valid Examples:

```bash
feat(CODE-110): add login button
fix(CODE-220): correct navbar layout issue
chore(CODE-300): update husky and lint rules
docs(CODE-145): add readme section for commit rules
````

#### ❌ Invalid Examples:

```bash
fix: broken feature              # ❌ missing JIRA ticket
feat(CODE123): add button        # ❌ missing dash in ticket
fix(CODE-001): Fix bug           # ❌ message starts with uppercase
feature(CODE-999): new feature   # ❌ invalid type "feature"
```

### 📜 Allowed `type` values

- `feat` – new feature
- `fix` – bug fix
- `docs` – documentation only changes
- `style` – code formatting, white-space, etc
- `refactor` – code changes that neither fix a bug nor add a feature
- `test` – adding missing tests or correcting existing tests
- `chore` – changes to the build process or auxiliary tools
- `perf` – performance improvements
- `poc` – proof of concept

### ⚠️ Rules:

- Max 100 characters in the commit header
- Always lowercase `type` and `scope`
- No period `.` at the end of the message

---

# 🇷🇺 Русская версия

## 🌍 Minzifa Travel Website

Добро пожаловать на официальный сайт **Minzifa Travel** — современную высокопроизводительную туристическую платформу, построенную с использованием [Next.js](https://nextjs.org/). Этот проект направлен на предоставление увлекательного и адаптивного пользовательского опыта, поддержку международных путешественников и поддержание согласованности и масштабируемости через чистую и поддерживаемую кодовую базу.

## ✨ Возможности

- ⚡ **Серверный рендеринг (SSR)** для лучшей производительности и SEO
- 🧭 **Маршрутизация** с файловой структурой Next.js
- 🎨 **Система дизайна** с согласованной компоновкой и стилизацией
- 📱 **Адаптивность** — оптимизировано для мобильных устройств, планшетов и десктопов
- 🌐 **Многоязычная поддержка** — интернационализированный пользовательский опыт
- 🧩 **Модульная архитектура** — переиспользуемые компоненты и четкое разделение ответственности

## 🛠 Технологии

- **Фреймворк**: Next.js (React + TypeScript)
- **Стилизация**: Tailwind CSS / CSS Modules
- **Интернационализация**: Next-i18next (или другая i18n библиотека)
- **Управление состоянием**: React Context / Zustand (опционально)
- **Линтинг и форматирование**: ESLint + Prettier
- **Контроль версий**: Git + Husky (хуки)
- **Соглашения коммитов**: Conventional Commits с commitlint

## 🚀 Быстрый старт

### Предварительные требования

Убедитесь, что у вас установлены:
- [Node.js](https://nodejs.org/) (версия 18 или выше)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)

### Установка и запуск

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Настройка окружения (опционально):**
   ```bash
   cp .env.example .env.local
   ```

   Отредактируйте `.env.local` с вашими настройками:
   ```env
   NEXT_PUBLIC_WS_URL="wss://centrifugo.minzifatravel.com/connection/websocket"
   NEXT_PUBLIC_BASE_API="http://localhost"
   ```

3. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```

4. **Откройте браузер:**
   Перейдите по адресу [http://localhost:3000](http://localhost:3000)

## ⚙️ Переменные окружения

| Переменная             | Описание                             | Значение по умолчанию                                     |
| ---------------------- | ------------------------------------ | --------------------------------------------------------- |
| `NEXT_PUBLIC_WS_URL`   | WebSocket URL для Centrifugo сервера | `wss://centrifugo.minzifatravel.com/connection/websocket` |
| `NEXT_PUBLIC_BASE_API` | Базовый URL для backend API          | `http://localhost`                                        |

**Примечание:** В текущей реализации переменные окружения закомментированы в `.env` файле и используются хардкодом в коде. Для лучшей практики рекомендуется раскомментировать и использовать переменные окружения.

## 🧺 Правила коммитов (`commit-msg` hook)

Этот проект использует `commit-msg` хук через **Husky** для обеспечения правильного форматирования коммитов с **commitlint**. Все коммиты **должны** следовать стандарту [Conventional Commits](https://www.conventionalcommits.org/) и включать ссылку на задачу JIRA.

### ✅ Обязательный формат:

```

<type>(CODE-<номер задачи>): <сообщение коммита>

````

- `type` — тип изменения (должен быть из списка ниже)
- `CODE-123` — ID задачи JIRA
- `сообщение коммита` — краткое, повелительное описание, начинающееся со строчной буквы

#### ✅ Корректные примеры:

```bash
feat(CODE-110): добавить кнопку входа
fix(CODE-220): исправить ошибку макета навигации
chore(CODE-300): обновить husky и правила линтинга
docs(CODE-145): добавить раздел readme для правил коммитов
```

#### ❌ Некорректные примеры:

```bash
fix: сломанная функция               # ❌ отсутствует задача JIRA
feat(CODE123): добавить кнопку       # ❌ отсутствует дефис в задаче
fix(CODE-001): Исправить ошибку      # ❌ сообщение начинается с заглавной буквы
feature(CODE-999): новая функция     # ❌ недопустимый тип "feature"
```

### 📜 Допустимые значения `type`

- `feat` – новая функция
- `fix` – исправление ошибки
- `docs` – изменения только в документации
- `style` – форматирование кода, пробелы и т.д.
- `refactor` – изменения кода, которые не исправляют ошибку и не добавляют функцию
- `test` – добавление недостающих тестов или исправление существующих тестов
- `chore` – изменения в процессе сборки или вспомогательных инструментах
- `perf` – улучшения производительности
- `poc` – доказательство концепции

### ⚠️ Правила:

- Максимум 100 символов в заголовке коммита
- Всегда строчные буквы для `type` и `scope`
- Нет точки `.` в конце сообщения

## 📜 Доступные скрипты

- `npm run dev` — запуск сервера разработки
- `npm run build` — сборка для продакшена
- `npm run start` — запуск продакшен сервера
- `npm run lint` — запуск линтера ESLint

## 🏗️ Структура проекта

```
client/
├── public/              # Статические файлы
├── src/
│   ├── components/      # React компоненты
│   ├── app/            # Next.js App Router страницы
│   ├── assets/         # Изображения и ресурсы
│   ├── styles/         # Глобальные стили
│   ├── utils/          # Вспомогательные функции
│   └── api/            # API утилиты
├── .env.example        # Пример переменных окружения
└── next.config.ts      # Next.js конфигурация
```

## 🔧 Разработка

### Работа с компонентами

Компоненты организованы по функциональным областям:
- `components/ui/` — базовые UI компоненты
- `components/layout/` — компоненты макета
- `components/features/` — компоненты функциональных модулей

### Стилизация

Используется Tailwind CSS с кастомными утилитами:
```jsx
<div className="bg-primary text-white p-4 rounded-lg shadow-md">
  Стилизованный компонент
</div>
```

### API интеграция

Клиент подключается к Laravel backend API:
```typescript
// Пример использования API
import { getApi } from '@/api/get.api'

const fetchTours = async () => {
  const tours = await getApi('/tours')
  return tours
}
```

## 🌐 Интеграции

### Backend API
Клиентское приложение взаимодействует с Laravel backend через REST API.

### WebSocket (Centrifugo)
Обеспечивает realtime обновления данных между клиентами и сервером.

## 🚀 Production сборка

Для развертывания в продакшен:

```bash
npm run build
npm run start
```

Артефакты сборки будут находиться в папке `.next/`.

## 🤝 Правила разработки

- Используйте TypeScript для типизации
- Следуйте ESLint правилам
- Форматируйте код с помощью Prettier
- Создавайте переиспользуемые компоненты
- Используйте семантическое именование классов

## 📝 Лицензия

Этот проект является собственностью Minzifa Travel.