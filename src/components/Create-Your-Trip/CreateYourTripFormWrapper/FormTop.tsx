'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import { FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useGetQuery } from '@/api/get.api';
import { DestinationCard } from '@/components/Home/Destinations/_types';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/store/useSnackStore';
import { useRouter } from 'next/navigation';
import { PhoneInputComp } from '@/components/UI';
import ImageWithFallback from '@/components/UI/ImageWithFallback/ImageWithFallback';

interface SubscribeFormRequest {
  hotel_type: string;
  days: string;
  date: string;
  destinations: string[];
  wishes: string;
  travellers_type: string;
  travellers: {
    adults: number;
    children: number;
  };
  appeals: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
}

interface FormResponse {
  form_data: SubscribeFormRequest;
  form_name: string;
}

export const FormTop = () => {
  const t = useTranslations('create-your-trip');
  const check = t.raw('form2.check') as { title: string }[];
  const [formData, setFormData] = useState<SubscribeFormRequest>({
    hotel_type: '',
    days: '1',
    date: '',
    destinations: [],
    wishes: '',
    travellers_type: 'Solo',
    travellers: {
      adults: 1,
      children: 1,
    },
    appeals: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    nationality: '',
  });
  const lang = useLocale();
  const { setMessage, setError } = useSnackStore((state) => state);

  const { data, isSuccess } = useGetQuery<{ data: DestinationCard[] }>({
    key: ['destinations_form_create'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&main_page=1',
  });

  const router = useRouter();

  const { mutate, isPending } = usePostMutation<FormResponse, SubscribeFormRequest>(
    ['subscribe-form'],
    () => {
      setMessage(lang == 'en' ? 'Your form was submitted!!' : 'Ваша форма была отправлена!');
      setFormData({
        hotel_type: '',
        days: '1',
        date: '',
        destinations: [],
        wishes: '',
        travellers_type: 'Solo',
        travellers: {
          adults: 1,
          children: 1,
        },
        appeals: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        nationality: '',
      });
      router.push(`/${lang}/thank-you`);
    },
    () => {
      setError(lang == 'en' ? 'Some error was happened' : 'Произошла ошибка');
    },
  );

  const handleSubmit = useCallback(() => {
    if (!isPending) {
      mutate({
        obj: formData,
        endpoint: 'forms/create-my-trip',
      });
    }
  }, [isPending, mutate, formData]);

  // Оптимизированный компонент для звездочек отелей
  const HotelStarsSelect = () => {
    const hotelOptions = [
      { value: '3 stars', label: t('form.hotel.3stars'), stars: 3 },
      { value: '4 stars', label: t('form.hotel.4stars'), stars: 4 },
      { value: '5 stars', label: t('form.hotel.5stars'), stars: 5 },
      { value: t('form.hotel.pl'), label: t('form.hotel.pl') },
      { value: t('form.hotel.pl2'), label: t('form.hotel.pl2') },
    ];

    return (
      <div className="w-full flex items-center justify-between gap-5">
        {hotelOptions.map((option) => (
          <label
            key={option.value}
            className={`bg-white rounded-[16px] flex-1 min-h-[55px] flex items-center justify-center cursor-pointer transition-colors ${formData.hotel_type === option.value ? 'bg-[#16372D] text-white' : 'hover:bg-gray-50'
              }`}
          >
            <input
              type="radio"
              name="hotel_type"
              value={option.value}
              checked={formData.hotel_type === option.value}
              onChange={() => setFormData((prev) => ({ ...prev, hotel_type: option.value }))}
              className="sr-only"
            />
            {option.stars ? (
              <div className="flex items-center gap-1 text-[18px] text-[#009F65] p-2">
                {Array.from({ length: option.stars }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            ) : (
              <span className="text-sm p-2">{option.label}</span>
            )}
          </label>
        ))}
      </div>
    );
  };

  // Оптимизированный компонент для счетчика дней
  const DaysCounter = () => (
    <div className="bg-white rounded-[16px] px-[10px] py-[15px] flex items-center justify-between w-full">
      <p>{t('form.hotel.pl3')}</p>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              days: (parseInt(prev.days || '0') + 1).toString(),
            }))
          }
        >
          <FaPlus size={12} />
        </button>
        <p className="w-[50px] text-[18px] text-center font-semibold">{formData.days}</p>
        <button
          type="button"
          className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors disabled:opacity-50"
          disabled={Number(formData.days) <= 1}
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              days: (Number(prev.days) <= 1 ? 1 : Number(prev.days) - 1).toString(),
            }))
          }
        >
          <FaMinus size={12} />
        </button>
      </div>
    </div>
  );

  // Оптимизированный компонент для выбора даты
  const DateSelect = () => (
    <div className="bg-white rounded-[16px] py-[3px] flex items-center justify-between w-full">
      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            date: e.target.value,
          }))
        }
        className="w-full px-4 py-3 border-none outline-none text-sm"
      />
    </div>
  );

  // Оптимизированный компонент для направлений
  const DestinationsSelect = () => {
    if (!isSuccess || !data?.data) return null;

    return (
      <div className="w-full flex items-center justify-between gap-5 flex-wrap">
        {data.data.slice(0, 6).map((el: DestinationCard) => {
          const isChecked = formData.destinations.includes(el.name);

          return (
            <label
              key={el.name}
              className={`bg-white rounded-[16px] flex-1 min-h-[55px] flex items-center justify-center cursor-pointer transition-colors ${isChecked ? 'bg-[#16372D] text-white' : 'hover:bg-gray-50'
                }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  const newDestinations = isChecked
                    ? formData.destinations.filter((d) => d !== el.name)
                    : [...formData.destinations, el.name];

                  setFormData((prev) => ({
                    ...prev,
                    destinations: newDestinations,
                  }));
                }}
                className="sr-only"
              />
              <p className="flex items-center gap-2 overflow-hidden p-2">
                {el.icon.file && (
                  <ImageWithFallback
                    src={el.icon.file}
                    alt={el.icon.alt_text || 'image'}
                    width={23}
                    height={23}
                    className="object-cover [@media(max-width:420px)]:hidden"
                  />
                )}
                <span className="text-[14px]">{el.name}</span>
              </p>
            </label>
          );
        })}
      </div>
    );
  };

  // Оптимизированный компонент для типа путешественников
  const TravellerTypeSelect = () => {
    const travellerTypes = [
      t('form2.btns.pl'),
      t('form2.btns.pl2'),
      t('form2.btns.pl3'),
      t('form2.btns.pl4'),
    ];

    return (
      <div className="flex items-center justify-between gap-5 [@media(max-width:420px)]:flex-wrap">
        {travellerTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${formData.travellers_type === type
              ? 'bg-[#27A430] text-white border-[#27A430]'
              : 'border-gray-300 hover:border-[#27A430]'
              }`}
            onClick={() => setFormData((prev) => ({ ...prev, travellers_type: type }))}
          >
            {type}
          </button>
        ))}
      </div>
    );
  };

  // Оптимизированный компонент для количества путешественников
  const TravellerCounter = () => (
    <div className="bg-white rounded-[16px] overflow-hidden w-full">
      <div className="px-[10px] py-[15px] flex items-center justify-between w-full">
        <p>{t('form2.pl')}</p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                travellers: {
                  ...prev.travellers,
                  adults: prev.travellers.adults + 1,
                },
              }))
            }
          >
            <FaPlus size={12} />
          </button>
          <p className="w-[50px] text-[18px] text-center font-semibold">
            {formData.travellers.adults}
          </p>
          <button
            type="button"
            className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors disabled:opacity-50"
            disabled={formData.travellers.adults <= 1}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                travellers: {
                  ...prev.travellers,
                  adults: prev.travellers.adults <= 1 ? 1 : prev.travellers.adults - 1,
                },
              }))
            }
          >
            <FaMinus size={12} />
          </button>
        </div>
      </div>
      <div className="bg-white border-t-2 px-[10px] py-[15px] flex items-center justify-between w-full">
        <p>{t('form2.pl2')}</p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                travellers: {
                  ...prev.travellers,
                  children: prev.travellers.children + 1,
                },
              }))
            }
          >
            <FaPlus size={12} />
          </button>
          <p className="w-[50px] text-[18px] text-center font-semibold">
            {formData.travellers.children}
          </p>
          <button
            type="button"
            className="w-8 h-8 bg-[#27A430] text-white rounded-md flex items-center justify-center hover:bg-[#1f8a26] transition-colors disabled:opacity-50"
            disabled={formData.travellers.children <= 1}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                travellers: {
                  ...prev.travellers,
                  children: prev.travellers.children <= 1 ? 1 : prev.travellers.children - 1,
                },
              }))
            }
          >
            <FaMinus size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  // Оптимизированный компонент для обращений
  const AppealSelect = () => (
    <div className="w-full flex items-center justify-start gap-5 max-[550px]:justify-center flex-wrap">
      {check.map((el) => (
        <label key={el.title} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="appeals"
            value={el.title}
            checked={formData.appeals === el.title}
            onChange={() => setFormData((prev) => ({ ...prev, appeals: el.title }))}
            className="w-4 h-4 text-[#27A430] focus:ring-[#27A430]"
          />
          <span className="text-sm">{el.title}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <h2 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px]">
        {t('sub_title')}
      </h2>

      {/* Hotel Selection Section */}
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8 max-[500px]:gap-4">
        <div className="w-full flex flex-col gap-5 max-[500px]:gap-3">
          <p className="text-[20px] font-semibold">{t('form.hotel.title')}</p>
          <HotelStarsSelect />

          <div className="flex items-center justify-between gap-5 w-full [@media(max-width:600px)]:flex-wrap">
            <DaysCounter />
            <DateSelect />
          </div>
        </div>

        <hr className="border-[#16372D]/20" />

        {/* Destinations Section */}
        <div className="flex flex-col gap-5">
          <p className="text-[20px] font-semibold">{t('form.destination.title')}</p>
          <p className="text-[16px] text-gray-500">{t('form.destination.text')}</p>
          <DestinationsSelect />
          <p>{t('form.destination.pl')}</p>
          <textarea
            className="bg-white rounded-[16px] p-5 min-h-[200px] resize-none focus:ring-2 focus:ring-[#27A430] focus:outline-none"
            value={formData.wishes}
            onChange={(e) => setFormData((prev) => ({ ...prev, wishes: e.target.value }))}
            placeholder={t('form.destination.pl2')}
          />
        </div>
      </div>

      <h2 className="text-[42px] max-[1024px]:text-[30px] max-[550px]:text-[24px]">
        {t('form2.title')}
      </h2>

      {/* Personal Information Section */}
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8 max-[550px]:gap-5">
        <TravellerTypeSelect />
        <TravellerCounter />

        <hr className="border-[#16372D]/20" />

        <AppealSelect />

        {/* Contact Information */}
        <div className="w-full flex items-center justify-between gap-5">
          <input
            type="text"
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none focus:ring-2 focus:ring-[#27A430]"
            value={formData.first_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
            placeholder={t('form2.pl4')}
          />
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none focus:ring-2 focus:ring-[#27A430]"
            placeholder={t('form2.pl5')}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none focus:ring-2 focus:ring-[#27A430]"
            placeholder={t('form2.pl6')}
          />
          <PhoneInputComp
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e }))}
          />
        </div>

        <input
          type="text"
          value={formData.nationality}
          onChange={(e) => setFormData((prev) => ({ ...prev, nationality: e.target.value }))}
          className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none focus:ring-2 focus:ring-[#27A430]"
          placeholder={t('form2.pl8')}
        />

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 text-[#27A430] focus:ring-[#27A430]"
          />
          <p className="max-[550px]:text-[11px]">{t('form2.pl9')}</p>
        </label>

        <button
          type="button"
          className="bg-[#27A430] text-white py-3 px-6 rounded-lg hover:bg-[#1f8a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? 'Отправка...' : t('form2.btn')}
        </button>
      </div>
    </div>
  );
};
