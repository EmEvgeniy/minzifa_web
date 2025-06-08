import { contact } from '@/assets/img';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import IconBubbleMessage from '@/assets/icons/message.svg';
import IconPhone from '@/assets/icons/phone.svg';
import IconWhatsapp from '@/assets/icons/Vector (5).svg';
import IconEnvelope from '@/assets/icons/question.svg';
import clsx from 'clsx';

export const ContactUs = () => {
  const lang = useLocale();

  const contactItems = [
    {
      icon: IconBubbleMessage,
      label: lang == 'en' ? 'Shop with us online' : 'Делайте покупки у нас онлайн',
    },
    {
      icon: IconEnvelope,
      label: lang == 'en' ? 'Get in touch on E-mail' : 'Свяжитесь по электронной почте',
    },
    {
      icon: IconWhatsapp,
      label: lang == 'en' ? 'Get in touch on WhatsApp' : 'Свяжитесь с нами по WhatsApp',
    },
    {
      icon: IconPhone,
      label: lang == 'en' ? 'Call us' : 'Позвоните нам',
    },
  ];
  return (
    <section className="container py-[70px]">
      <div className="bg-white rounded-[16px] shadow-2xl  flex items-center justify-between overflow-hidden">
        <div className="p-10 flex flex-col gap-8">
          <p className="text-[42px] text-black">Contact us</p>
          <p className="text-[18px]">
            Contact us - we will help you find a tour, clarify the details and book everything for
            you.
          </p>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 items-start">
            {contactItems.map(({ icon, label }, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-4 text-center"
              >
                <button
                  className={clsx(
                    'bg-[#66B93E] hover:scale-105 aspect-square size-20 flex items-center justify-center cursor-pointer rounded-full p-0 text-white transition',
                  )}
                >
                  <Image src={icon} alt="" width={30} className="w-[30px]" />
                </button>
                <span className="text-[14px] text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={contact}
          alt="contact-us"
          width={600}
          height={500}
          className=" object-cover md:mask-l-from-50% md:mask-l-to-90%"
        />
      </div>
    </section>
  );
};
