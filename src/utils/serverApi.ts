/**
 * Универсальные API-утилиты для серверных компонентов Next.js
 */

export class ApiError<T = unknown> extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;
  public readonly data?: T;

  constructor(status: number, statusText: string, url: string, data?: T) {
    super(`API Error ${status}: ${statusText} for ${url}`);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.data = data;
  }
}

function buildApiUrl(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
    : 'http://localhost/api/v1';
  return endpoint.startsWith('http') ? endpoint : `${baseUrl}/${endpoint.replace(/^\/+/, '')}`;
}

type ApiRequestOptions<B = unknown> = Omit<RequestInit, 'body' | 'method'> & {
  body?: B;
  revalidate?: number;
};

/**
 * Универсальная функция для API-запросов
 */
async function apiRequest<TResponse, TBody = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  options?: ApiRequestOptions<TBody>,
): Promise<TResponse> {
  const url = buildApiUrl(endpoint);
  const { body, headers, revalidate, ...rest } = options ?? {};

  const response = await fetch(url, {
    method,
    next: revalidate !== undefined ? { revalidate } : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');

  if (!response.ok) {
    const errorData = isJson ? await response.json().catch(() => undefined) : undefined;
    throw new ApiError(response.status, response.statusText, url, errorData);
  }

  return (isJson ? await response.json() : undefined) as TResponse;
}

/**
 * Типобезопасный GET-запрос
 */
export function apiGet<TResponse>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<TResponse> {
  return apiRequest<TResponse>('GET', endpoint, { ...options });
}

/**
 * Типобезопасный POST-запрос
 */
export function apiPost<TResponse, TBody = unknown>(
  endpoint: string,
  body?: TBody,
  options?: ApiRequestOptions<TBody>,
): Promise<TResponse> {
  return apiRequest<TResponse, TBody>('POST', endpoint, { ...options, body, revalidate: 0 });
}

/**
 * PUT / PATCH / DELETE при желании можно реализовать аналогично
 */
export function apiPut<TResponse, TBody = unknown>(
  endpoint: string,
  body?: TBody,
  options?: ApiRequestOptions<TBody>,
): Promise<TResponse> {
  return apiRequest<TResponse, TBody>('PUT', endpoint, { ...options, body, revalidate: 0 });
}

export function apiDelete<TResponse>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<TResponse> {
  return apiRequest<TResponse>('DELETE', endpoint, { ...options, revalidate: 0 });
}
