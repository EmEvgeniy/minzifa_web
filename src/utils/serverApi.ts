/**
 * Утилиты для API вызовов в серверных компонентах Next.js
 * Использует встроенный fetch API с правильной конфигурацией кеширования
 */

/**
 * GET запрос к API для серверных компонентов
 * @param endpoint - API endpoint (без базового URL)
 * @param options - дополнительные опции fetch
 * @returns Promise с данными
 */
export async function apiGet<T = unknown>(endpoint: string, options?: RequestInit): Promise<T> {
  // Получаем базовый URL из переменных окружения
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api/v1';

  // Если endpoint уже содержит полный URL, используем его как есть
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}/${endpoint.replace(/^\//, '')}`;

  try {
    const response = await fetch(url, {
      // Настройки Next.js для кеширования
      next: { revalidate: 300 }, // 5 минут кеширования по умолчанию
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText} for ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

/**
 * POST запрос к API для серверных компонентов
 * @param endpoint - API endpoint
 * @param data - данные для отправки
 * @param options - дополнительные опции fetch
 * @returns Promise с ответом
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api/v1';
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}/${endpoint.replace(/^\//, '')}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      next: { revalidate: 0 }, // Не кешировать POST запросы
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText} for ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API POST Request failed:', error);
    throw error;
  }
}
