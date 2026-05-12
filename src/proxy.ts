import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
});

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (/\.(htm|html|php|env|git|svn)$/i.test(pathname)) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
  }

  return intlMiddleware(request);
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
