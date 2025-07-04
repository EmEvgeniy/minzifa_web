import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: false,
});

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
