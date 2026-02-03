import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_NAME, PROTECTED_ROUTES } from './constants';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
});

export function proxy(request: NextRequest) {
  // Security: Block requests with suspicious extensions
  const pathname = request.nextUrl.pathname;
  if (/\.(htm|html|php|env|git|svn)$/i.test(pathname)) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
  }

  const response = intlMiddleware(request);

  const token = request.cookies.get(AUTH_TOKEN_NAME)?.value;

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
    '/(.*)\\.(htm|html|php|env|git|svn)',
    '/(en|ru)/profile/:path*',
    '/(en|ru)/chats/:path*',
    '/(en|ru)/dashboard/:path*',
    '/(en|ru)/orders/:path*',
  ],
};
