import { contact } from '@/assets/img';
import Image from 'next/image';
import IconPhone from '@/assets/icons/phone.svg';
import IconWhatsapp from '@/assets/icons/Vector (5).svg';
import IconEnvelope from '@/assets/icons/question.svg';
import clsx from 'clsx';
import Link from 'next/link';
import { contacts } from '@/store/contacts';
import { DefaultComponentsProps } from '@/types';
import { getTranslations } from 'next-intl/server';

export default async function ContactUs({ locale }: DefaultComponentsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const contactItems = [
    {
      icon: IconEnvelope,
      label: t(`contacts.envelope`),
      slug: contacts.email?.[locale].url,
    },
    {
      icon: IconWhatsapp,
      label: t(`contacts.whatsapp`),
      slug: contacts.social_media.find((item) => item.name === 'WhatsApp')?.url?.[locale],
    },
    {
      icon: IconPhone,
      label: t(`contacts.phone`),
      slug: contacts.phone?.[locale].url,
    },
  ];

  return (
    <section className="container py-[70px]">
      <div className="bg-white rounded-[16px] shadow-2xl flex items-center justify-between overflow-hidden [@media(max-width:1024px)]:flex-col-reverse">
        <div className="p-10 flex flex-col gap-8 [@media(max-width:768px)]:gap-5 [@media(max-width:768px)]:p-5">
          <p className="text-[42px] text-black [@media(max-width:768px)]:text-[24px] [@media(max-width:768px)]:text-center">
            {t('contacts.title')}
          </p>
          <p className="text-[18px] [@media(max-width:768px)]:text-[16px] [@media(max-width:768px)]:text-center">
            {t('contacts.subtitle')}
          </p>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 items-start">
            {contactItems.map(({ icon, label, slug }, index) => (
              <Link
                href={slug || '#'}
                key={index}
                className="flex flex-col items-center justify-center gap-4 text-center"
              >
                <button
                  className={clsx(
                    'bg-[#66B93E] hover:scale-105 aspect-square size-20 flex items-center justify-center cursor-pointer rounded-full p-0 text-white transition [@media(max-width:768px)]:size-15',
                  )}
                >
                  <Image
                    src={icon}
                    alt=""
                    loading="lazy"
                    width={30}
                    className="w-[30px] [@media(max-width:768px)]:w-[25px]"
                  />
                </button>
                <span className="text-[14px] text-center [@media(max-width:768px)]:text-[12px]">
                  {label}
                </span>
              </Link>
            ))}
          </div>
           
        </div>
        <div className="relative w-[50%] h-[420px] [@media(max-width:1024px)]:w-full [@media(max-width:1024px)]:h-[300px]">
          <Image
            src={contact}
            alt="contact-us"
            fill
            className="object-cover md:mask-l-from-50% md:mask-l-to-90%"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
