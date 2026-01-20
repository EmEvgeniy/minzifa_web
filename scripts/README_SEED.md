# Инструкция по использованию скрипта seed-articles.js

## Подготовка

### 1. Установите зависимости

```bash
cd /Users/tima12/Documents/projects/minzifa_travel/client
npm install axios dotenv
```

### 2. Получите токен авторизации

1. Откройте браузер и перейдите на страницу логина:

   ```
   http://localhost:3000/en/prototype/adventures/admin/login
   ```

2. Войдите в систему используя ваши credentials

3. Откройте DevTools (F12 или Cmd+Option+I)

4. Перейдите в Application → Local Storage → http://localhost:3000

5. Найдите ключ `adventures_auth_token` и скопируйте его значение

### 3. Создайте .env файл

Создайте файл `.env` в корне проекта client и добавьте:

```env
ADVENTURES_TOKEN=ваш_скопированный_токен
```

## Запуск скрипта

```bash
node scripts/seed-articles.js
```

## Что делает скрипт

Скрипт создаст статьи для следующих категорий:

### Good Life (2 статьи)

- Discovering the Art of Slow Travel in Uzbekistan
- Living Like a Local: Traditional Uzbek Lifestyle

### Good Ideas (1 статья)

- 10 Creative Ways to Experience Uzbekistan Off the Beaten Path

### The Goods News (1 статья)

- Uzbekistan Opens New Tourist Routes for 2026

### The Goods (1 статья)

- The Ultimate Shopping Guide: Uzbek Handicrafts and Souvenirs

### Good Stories (2 статьи)

- A Silk Road Journey: Following Ancient Trade Routes
- The Tea House Chronicles: Conversations in Uzbekistan

### Good Trips (2 статьи)

- The Perfect 10-Day Uzbekistan Itinerary
- Weekend Getaways from Tashkent: 5 Perfect Escapes

**Всего: 9 статей**

## Возможные проблемы

### Ошибка "ADVENTURES_TOKEN не найден"

- Убедитесь, что файл `.env` создан в правильной директории
- Проверьте, что токен скопирован корректно

### Ошибка 401 (Unauthorized)

- Токен истек, получите новый токен
- Проверьте правильность токена

### Ошибка 422 (Validation Error)

- Возможно, статья с таким slug уже существует
- Скрипт пропустит эту статью и продолжит работу

## Кастомизация

Вы можете отредактировать файл `scripts/seed-articles.js` чтобы:

- Добавить больше статей в `articleTemplates`
- Изменить содержимое существующих статей
- Добавить новые категории
- Изменить userId (по умолчанию 1)

## После запуска

После успешного выполнения скрипта:

1. Обновите страницу категорий в браузере
2. Проверьте, что статьи отображаются корректно
3. Убедитесь, что теги и категории назначены правильно
