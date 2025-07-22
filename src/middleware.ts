import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Добавляем pathname в заголовок
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/', '/sitemap.xml', '/(ru|en)/:path*'],
};
