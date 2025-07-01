import { useLocale } from 'next-intl';
import Script from 'next/script';
import Head from 'next/head';

export default function Metrics() {
    const locale = useLocale();
    const isRussian = locale === 'ru';

    return (
        <>
            <Head>
                <meta
                    name="google-site-verification"
                    content="TXw2szbVg4BjVd82sfGaC_LgwUgkH0hQrTlJRec6mg0"
                />
                <meta name="yandex-verification" content="0cf29f74b98cb00d" />
            </Head>

            {/* Universal Google Tag */}
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-M136S4C9GK"
            />
            <Script id="google-tag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    ${isRussian
                        ? `
                            gtag('config', 'AW-16625384260');
                        `
                        : `
                            gtag('config', 'G-M136S4C9GK');
                        `}

                    gtag('config', 'AW-301071748');
                `}
            </Script>

            {isRussian ? (
                <>
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
                </>
            ) : (
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
                </>
            )}
        </>
    );
}