'use client';

import { useTranslations } from 'next-intl';
import { Tour } from '../_types';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { FaStar } from 'react-icons/fa6';
import FormattedPrice from '@/components/UI/FormattedPrice/FormattedPrice';
import { cn } from '@/utils';
import { useEffect } from 'react';
import Button from '@/components/UI/Button/Button';

type PrivatePriceFormProps = {
  tour: Tour;
};

const PrivatePriceForm = ({ tour }: PrivatePriceFormProps) => {
  const t = useTranslations('tourDetail');

  const { formData, setFormData, setPopup } = usePrivateTourFormStore();

  useEffect(() => {
    setFormData({ price: tour?.prices?.price_for_3_hotels });
  }, [tour, setFormData]);

  const handleSelectPrice = (price: string | undefined) => {
    setFormData({ ...formData, price });
  };

  const comfortOptions = [
    {
      key: 'moderate',
      stars: 3,
      price: tour?.prices?.price_for_3_hotels,
    },
    {
      key: 'enhanced',
      stars: 4,
      price: tour?.prices?.price_for_4_hotels,
    },
    {
      key: 'ultimate',
      stars: 5,
      price: tour?.prices?.price_for_5_hotels,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
      <h2 className='text-base font-medium'>{t('privateTour.comfort.title')}</h2>

      {comfortOptions?.map(({ key, stars, price }) => !!price && (
        <div
          key={key}
          aria-selected={formData.price === price}
          className={cn(
            'cursor-pointer border border-[#D8DADC] hover:border-[#16372D] active:border-[#16372D] rounded-2xl p-4 flex justify-between items-center transition-all duration-200',
            formData.price === price && 'border-[#16372D] shadow-lg'
          )}
          onClick={() => handleSelectPrice(price)}
        >
          <div>
            {t(`privateTour.comfort.${key}`)}
            <div className="flex flex-row gap-0.5">
              {Array.from({ length: stars }).map((_, i) => (
                <FaStar key={i} size={20} className="text-[#009F65] w-5 h-5" />
              ))}
            </div>
          </div>
          <FormattedPrice
            price={price}
            currency={tour?.prices?.valute}
            className="text-lg font-semibold"
          />
        </div>
      ))}

      <Button
        onClick={() => setPopup(true)}
        color='primary'
        className="w-full px-6 py-4 rounded-4xl"
      >
        {t('privateTour.freeConsultation')}
      </Button>
      <div className="text-center w-full text-sm">{t('privateTour.comfort.hint')}</div>
    </div>
  );
};

export default PrivatePriceForm;
