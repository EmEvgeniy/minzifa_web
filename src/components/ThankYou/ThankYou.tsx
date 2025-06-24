import { useTranslations } from "next-intl";

export const Wrapper = () => {
    const t = useTranslations('ThankYou');
    return (
        <section className="h-screen">
            <div className="container h-full flex flex-col gap-5 items-center justify-center text-center">
                <h1 className="text-4xl font-bold">{t('title')}</h1>
                <h2>{t('subtitle')}</h2>
                <p>{t('text')}</p>
            </div>
        </section>
    );
}