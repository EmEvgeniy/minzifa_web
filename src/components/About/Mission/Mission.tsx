import { getTranslations } from 'next-intl/server';

export default async function Mission({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <section className="container my-[70px] flex flex-col gap-8 max-[550px]:my-[40px]">
      <h4 className="text-[42px] text-[#16372D] max-[768px]:text-center max-[768px]:text-[30px]">
        {t('mission_title')}
      </h4>
      <div className="grid grid-cols-2 gap-5 text-[18px] text-[#16372D] max-[550px]:grid-cols-1 max-[550px]:text-[16px]">
        <p>{t('mission_text')}</p>
        <p>{t('mission_text3')}</p>
        <p>{t('mission_text2')}</p>
        <p>{t('mission_text4')}</p>
      </div>
    </section>
  );
}
