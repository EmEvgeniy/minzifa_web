import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, PROTECTED_ROUTES } from './constants';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
});

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (PROTECTED_ROUTES.some((route) => route.test(pathname))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('require-auth', '1');
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(en|ru)/profile/:path*',
    '/(en|ru)/chats/:path*',
    '/(en|ru)/dashboard/:path*',
    '/(en|ru)/orders/:path*',
  ],
};
