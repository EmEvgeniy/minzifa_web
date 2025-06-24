'use client';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useGetQuery } from '@/api/get.api';
import { DestinationBlockProps } from '@/components/Home/Destinations/_types';
import Image from 'next/image';
import { usePostMutation } from '@/api/post.api';
import { useSnackStore } from '@/components/UI/CustomSnackBar/store';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useRouter } from 'next/router';
import { PhoneInputComp } from '@/components/UI';

interface SubscribeFormRequest {
  hotel_type: string;
  days: string;
  date: Dayjs | string;
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

  const { data, isSuccess } = useGetQuery<DestinationBlockProps[]>({
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
        http: 'forms/create-my-trip',
      });
    }
  }, [isPending, mutate, formData]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <h2 className="text-[42px] max-[1024px]:text-[35px] max-[768px]:text-[24px]">
        {t('sub_title')}
      </h2>
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8 max-[500px]:gap-4">
        <div className="w-full flex flex-col gap-5 max-[500px]:gap-3">
          <p className="text-[20px] font-semibold">{t('form.hotel.title')}</p>
          <FormControl className="w-full">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              className="w-full flex items-center justify-between gap-5"
            >
              <FormControlLabel
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  flex: 1,
                  minHeight: 55,
                  width: '100%',
                  margin: 0,
                }}
                checked={formData.hotel_type === '3 stars'}
                onChange={() => setFormData((prev) => ({ ...prev, hotel_type: '3 stars' }))}
                value="3 stars"
                control={<Radio />}
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65] p-2">
                    {Array.from({ length: 3 })
                      .fill(1)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                }
              />
              <FormControlLabel
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  flex: 1,
                  minHeight: 55,
                  width: '100%',
                  margin: 0,
                }}
                value="4 stars"
                control={<Radio />}
                checked={formData.hotel_type === '4 stars'}
                onChange={() => setFormData((prev) => ({ ...prev, hotel_type: '4 stars' }))}
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65] p-2">
                    {Array.from({ length: 4 })
                      .fill(1)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                }
              />
              <FormControlLabel
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  flex: 1,
                  minHeight: 55,
                  margin: 0,
                }}
                value="5 stars"
                checked={formData.hotel_type === '5 stars'}
                onChange={() => setFormData((prev) => ({ ...prev, hotel_type: '5 stars' }))}
                control={<Radio />}
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65] p-2">
                    {Array.from({ length: 5 })
                      .fill(1)
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>
                }
              />
              <FormControlLabel
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  flex: 1,
                  minHeight: 55,
                  margin: 0,
                }}
                checked={formData.hotel_type === t('form.hotel.pl')}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, hotel_type: t('form.hotel.pl') }))
                }
                value={t('form.hotel.pl')}
                control={<Radio />}
                label={t('form.hotel.pl')}
              />
              <FormControlLabel
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  flex: 1,
                  minHeight: 55,
                  margin: 0,
                }}
                checked={formData.hotel_type === t('form.hotel.pl2')}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, hotel_type: t('form.hotel.pl2') }))
                }
                value={t('form.hotel.pl2')}
                control={<Radio />}
                label={t('form.hotel.pl2')}
              />
            </RadioGroup>
          </FormControl>
          <div className="flex items-center justify-between gap-5 w-full [@media(max-width:600px)]:flex-wrap">
            <div className="bg-white rounded-[16px] px-[10px] py-[15px] flex items-center justify-between w-full">
              <p>{t('form.hotel.pl3')}</p>
              <div className="flex items-center justify-between">
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      days: (parseInt(prev.days || '0') + 1).toString(),
                    }))
                  }
                >
                  <AddIcon fontSize="small" />
                </Button>
                <p className="w-[50px] text-[18px] text-center font-semibold">{formData.days}</p>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      days: (Number(prev.days) <= 1 ? 1 : Number(prev.days) - 1).toString(),
                    }))
                  }
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-[16px]  py-[3px] flex items-center justify-between w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
                <DatePicker
                  value={formData.date ? dayjs(formData.date) : null}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      date: value ? value.toISOString() : '',
                    }))
                  }
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-root.MuiOutlinedInput-root': {
                      borderRadius: '15px',
                      border: 'none !important',
                    },
                    '& .css-lqwr9g-MuiPickersOutlinedInput-notchedOutline': {
                      border: 'none !important',
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <Divider className="pt-[20px]" />
        <div className="flex flex-col gap-5">
          <p className="text-[20px] font-semibold">{t('form.destination.title')}</p>
          <p className="text-[16px] text-gray-500">{t('form.destination.text')}</p>
          <FormControl className="w-full">
            <div className="w-full flex items-center justify-between gap-5 flex-wrap">
              {isSuccess &&
                data.slice(0, 6).map((el: DestinationBlockProps) => {
                  const isChecked = formData.destinations.includes(el.name);

                  return (
                    <FormControlLabel
                      key={el.name}
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        flex: 1,
                        minHeight: 55,
                        width: '100%',
                        margin: 0,
                      }}
                      control={
                        <Checkbox
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
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
                        />
                      }
                      label={
                        <p className="flex items-center gap-2 overflow-hidden p-2">
                          {el.icon.file && (
                            <Image
                              src={el.icon.file}
                              alt={el.icon.alt_text || 'image'}
                              width={23}
                              height={23}
                              className="object-cover [@media(max-width:420px)]:hidden"
                            />
                          )}
                          <span className="text-[14px]">{el.name}</span>
                        </p>
                      }
                    />
                  );
                })}
            </div>
          </FormControl>
          <p>{t('form.destination.pl')}</p>
          <textarea
            className="bg-white rounded-[16px] p-5 min-h-[200px]"
            value={formData.wishes}
            onChange={(e) => setFormData((prev) => ({ ...prev, wishes: e.target.value }))}
            placeholder={t('form.destination.pl2')}
          />
        </div>
      </div>
      <h2 className="text-[42px] max-[1024px]:text-[30px] max-[550px]:text-[24px]">
        {t('form2.title')}
      </h2>
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8 max-[550px]:gap-5">
        <div className="flex items-center justify-between gap-5 [@media(max-width:420px)]:flex-wrap">
          <Button
            onClick={() =>
              setFormData((prev) => ({ ...prev, travellers_type: t('form2.btns.pl') }))
            }
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl') === formData.travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl')}
          </Button>
          <Button
            onClick={() =>
              setFormData((prev) => ({ ...prev, travellers_type: t('form2.btns.pl2') }))
            }
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl2') === formData.travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl2')}
          </Button>
          <Button
            onClick={() =>
              setFormData((prev) => ({ ...prev, travellers_type: t('form2.btns.pl3') }))
            }
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl3') === formData.travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl3')}
          </Button>
          <Button
            onClick={() =>
              setFormData((prev) => ({ ...prev, travellers_type: t('form2.btns.pl4') }))
            }
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl4') === formData.travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl4')}
          </Button>
        </div>
        <div className="bg-white rounded-[16px] overflow-hidden w-full">
          <div className=" px-[10px] py-[15px] flex items-center justify-between w-full">
            <p>{t('form2.pl')}</p>
            <div className="flex items-center justify-between">
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
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
                <AddIcon fontSize="small" />
              </Button>
              <p className="w-[50px] text-[18px] text-center font-semibold">
                {formData.travellers.adults}
              </p>
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
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
                <RemoveIcon fontSize="small" />
              </Button>
            </div>
          </div>
          <div className="bg-white border-t-2 px-[10px] py-[15px] flex items-center justify-between w-full">
            <p>{t('form2.pl2')}</p>
            <div className="flex items-center justify-between">
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
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
                <AddIcon fontSize="small" />
              </Button>
              <p className="w-[50px] text-[18px] text-center font-semibold">
                {formData.travellers.children}
              </p>
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
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
                <RemoveIcon fontSize="small" />
              </Button>
            </div>
          </div>
        </div>
        <Divider className="pt-[20px]" />
        <FormControl className="w-full">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="w-full flex items-center justify-start gap-5 max-[550px]:justify-center"
          >
            {check.map((el) => (
              <FormControlLabel
                key={el.title}
                value={el.title}
                checked={formData.appeals === el.title}
                onChange={() => setFormData((prev) => ({ ...prev, appeals: el.title }))}
                control={<Radio />}
                label={el.title}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="w-full flex items-center justify-between gap-5">
          <input
            type="text"
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
            value={formData.first_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
            placeholder={t('form2.pl4')}
          />
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, last_name: e.target.value }))}
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
            placeholder={t('form2.pl5')}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
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
          className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
          placeholder={t('form2.pl8')}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={<p className="max-[550px]:text-[11px]">{t('form2.pl9')}</p>}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="secondary"
          sx={{ minHeight: 45, borderRadius: 2 }}
        >
          {t('form2.btn')}
        </Button>
      </div>
    </div>
  );
};
