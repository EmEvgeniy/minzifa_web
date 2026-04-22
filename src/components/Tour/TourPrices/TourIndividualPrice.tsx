'use client';

import Button from '@/components/UI/Button/Button';
import { CustomDatepicker } from '@/components/UI/CustomDatepicker/CustomDatepicker';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLocale, useTranslations } from 'next-intl';
import { Tour } from '../_types';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { calculateEndDate } from '@/utils/utils';


export default function TourIndividualPrice({ tour }: { tour: Tour }) {
  const t = useTranslations('tourDetail');
  const locale = useLocale();

  const { formData, setFormData, setPopup } = usePrivateTourFormStore();
  const { isAuthenticated, setAuthPopup } = useAuthStore();

  const handleDateChange = (newValue: [Date | null, Date | null], days: number) => {
    if (newValue && newValue[0] && !newValue[1] && days) {
      const startDate = newValue[0];
      const endDate = calculateEndDate(startDate, days);

      setFormData(prev => ({ ...prev, dates: [startDate, endDate] }));
    } else {
      setFormData(prev => ({ ...prev, dates: newValue }));
    }
  };

  useEffect(() => {
    const now = new Date();
    const endDate = calculateEndDate(now, tour?.days);
    setFormData(prev => ({ ...prev, dates: [now, endDate] }));
  }, [tour?.days, setFormData]);

  return (
    <section className="flex flex-col gap-5 max-[550px]:gap-3">
      <h2 className="text-4xl font-semibold  max-[920px]:text-[24px]">
        {t('privateTour.openForm.title')}
      </h2>
      <div className="flex flex-col gap-5 items-center bg-white rounded-2xl">
        <CustomDatepicker
          startDate={formData.dates[0]}
          endDate={formData.dates[1]}
          onChange={(values) => handleDateChange(values, tour?.days)}
          locale={locale}
          inline
          monthsShown={isMobile ? 1 : 2}
          selectsRange
          minDate={new Date()}
          wrapperClassName='pt-5'
        />
        <div className="p-5 w-full">
          <Button type="button" onClick={() => isAuthenticated ? setPopup(true) : setAuthPopup(true)} className='w-full'>
            {t('privateTour.freeConsultation')}
          </Button>
        </div>
      </div>
    </section>
  );
}
