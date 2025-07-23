import { useLocale } from 'next-intl';
import Script from 'next/script';

export default function Metrics() {
  const locale = useLocale();
  const isRussian = locale === 'ru';
  const isEnglish = locale === 'en';


  return (
    <>
      {/* Universal Google Tag */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-M136S4C9GK" />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          ${isRussian ? `gtag('config', 'AW-16625384260');` : `gtag('config', 'G-M136S4C9GK');`}

          gtag('config', 'AW-301071748');
          gtag('config', 'G-JK3M1DVN37');
      `}
      </Script>

      {/* Yandex Metrika */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
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

      {isEnglish && (
        <>
          {/* Facebook Pixel */}
          <Script id="facebook-pixel" strategy="afterInteractive">
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
          {/* Clarity */}
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sdnbxkik9r");
            `}
          </Script>
        </>
      )}
    </>
  );
}
