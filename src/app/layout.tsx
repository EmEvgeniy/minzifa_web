import localFont from 'next/font/local';
import './[locale]/globals.css';
import { useLocale } from 'next-intl';

const fonts = localFont({
  src: [
    {
      path: '../assets/fonts/SF-Pro-Display/SF-Pro-Display-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SF-Pro-Display/SF-Pro-Display-Medium.woff',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../assets/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.woff',
      weight: '700',
      style: 'semi-bold',
    },
    {
      path: '../assets/fonts/SF-Pro-Display/SF-Pro-Display-Bold.woff',
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
