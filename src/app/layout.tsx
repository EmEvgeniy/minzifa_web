import './[locale]/globals.css';
import { useLocale } from 'next-intl';
import { Unbounded, Inter } from 'next/font/google';
import Script from 'next/script';

const TitleFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-title',
  weight: '400',
  display: 'swap',
});

const TextFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-text',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body className={`${TitleFont.variable} ${TextFont.variable}`}>
        {locale === 'ru' ? (
          <>
            <Script
              id="yandex-metrika"
              strategy="afterInteractive"
            >
              {`(function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(98106769, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
                });
              `}
            </Script>
          </>
        ) : (
          <>
            {/* Facebook Pixel */}
            <Script
              id="facebook-pixel"
              strategy="afterInteractive"
            >
              {`
            !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '777577019559963');
              fbq('track', 'PageView');
            `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
