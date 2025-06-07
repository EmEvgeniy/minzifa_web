import localFont from 'next/font/local';
import './globals.css';
import { useLocale } from 'next-intl';

const fonts = localFont({
  src: [
    {
      path: '../../../public/fonts/SF-Pro-Display/SF-Pro-Display-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SF-Pro-Display/SF-Pro-Display-Medium.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../../public/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.woff',
      weight: '700',
      style: 'semi-bold',
    },
    {
      path: '../../../public/fonts/SF-Pro-Display/SF-Pro-Display-Bold.woff',
      weight: '900',
      style: 'bold',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={`${locale}`}>
      <body className={fonts.className}>{children}</body>
    </html>
  );
}
