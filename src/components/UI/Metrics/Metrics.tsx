'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getAnalyticsConfig } from '@/utils/config';


export default function Metrics({ locale }: { locale: string }) {
  const isRussian = locale === 'ru';
  const isEnglish = locale === 'en';
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  const analyticsConfig = getAnalyticsConfig();

  // Загружаем аналитику только после первого рендера и взаимодействия пользователя
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadAnalytics(true);
    }, 2000); // Задержка 2 секунды

    return () => clearTimeout(timer);
  }, []);

  // Альтернативно: загружать только при взаимодействии пользователя
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleUserInteraction = () => {
      setShouldLoadAnalytics(true);
      // Удаляем слушатели после первого взаимодействия
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  if (!shouldLoadAnalytics) {
    return null; // Не загружаем аналитику сразу
  }

  return (
    <>
      {/* Universal Google Tag - загружаем асинхронно */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${isRussian
            ? `gtag('config', 'AW-16625384260');`
            : `gtag('config', '${analyticsConfig.gaId}');`
          }

          gtag('config', 'AW-301071748');
          gtag('config', 'G-JK3M1DVN37');
        `}
      </Script>

      {/* Yandex Metrika - загружаем лениво */}
      <Script
        id="yandex-metrika"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${analyticsConfig.yandexId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });
          `,
        }}
      />

      {isEnglish && (
        <>
          {/* Facebook Pixel - загружаем лениво */}
          <Script
            id="facebook-pixel"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${analyticsConfig.facebookPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />

          {/* Clarity - загружаем лениво */}
          <Script
            id="clarity"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "sdnbxkik9r");
              `,
            }}
          />
        </>
      )}
    </>
  );
}
