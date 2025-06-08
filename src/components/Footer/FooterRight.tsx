'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export const FooterRight = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>('');

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-[20px]">{t('footer.form_title')}</p>
      <p className="text-[16px]">{t('footer.form_text')}</p>

      <form action="#" className="w-full ">
        <div className=" flex items-center justify-between rounded-[16px]  gap-5 w-full">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('footer.form_pl')}
            className="w-full outline-none focus:outline-none   rounded-[20px] px-3 py-2 text-[#16372D] bg-white w-full"
          />

          <button
            type="submit"
            className="bg-[#27A430] py-[8px] px-[25px] rounded-[20px] text-[16px] "
          >
            {t('footer.form_btn')}
          </button>
        </div>
      </form>

      <p className="text-[16px]">{t('footer.form_b_text')}</p>
    </div>
  );
};
