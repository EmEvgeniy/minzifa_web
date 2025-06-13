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
import React, { useState } from 'react';
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

export const FormTop = () => {
  const t = useTranslations('create-your-trip');
  const check = t.raw('form2.check') as { title: string }[];
  const [days, setDays] = useState<number>(1);
  const [person, setPerson] = useState<number>(1);
  const [child, setChild] = useState<number>(1);
  const lang = useLocale();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [travellers_type, setTravellers_type] = useState<string>('Solo');

  const { data, isSuccess } = useGetQuery<DestinationBlockProps[]>({
    key: ['destinations_form_create'],
    page: '',
    perPage: '',
    url: 'destinations',
    searchItem: '',
    additionalParam: '&main_page=1',
  });

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <h2 className="text-[42px]">{t('sub_title')}</h2>
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8">
        <div className="w-full flex flex-col gap-5">
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
                value="3 stars"
                control={<Radio />}
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65]">
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
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65]">
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
                control={<Radio />}
                label={
                  <div className="flex items-center gap-1 text-[18px] text-[#009F65]">
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
                  onClick={() => setDays(days + 1)}
                >
                  <AddIcon fontSize="small" />
                </Button>
                <p className="w-[50px] text-[18px] text-center font-semibold">{days}</p>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                  onClick={() => (days <= 1 ? setDays(1) : setDays(days - 1))}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-[16px]  py-[3px] flex items-center justify-between w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
                <DatePicker
                  value={dayjs(date)}
                  onChange={(value) => setDate(value)}
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
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              className="w-full flex items-center justify-between gap-5 flex-wrap"
            >
              {isSuccess &&
                data.slice(0, 6).map((el: DestinationBlockProps) => (
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
                    value={el.name}
                    control={<Radio />}
                    label={
                      <p className="flex items-center gap-2 overflow-hidden">
                        {el.icon.file && (
                          <Image
                            src={el.icon.file ? el.icon.file : ''}
                            alt={el.icon.alt_text ? el.icon.alt_text : 'image'}
                            width={23}
                            height={23}
                            className="object-cover [@media(max-width:420px)]:hidden"
                          />
                        )}
                        <span className="text-[14px]">{el.name}</span>
                      </p>
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <p>{t('form.destination.pl')}</p>
          <textarea
            className="bg-white rounded-[16px] p-5 min-h-[200px]"
            placeholder={t('form.destination.pl2')}
          />
        </div>
      </div>
      <h2 className="text-[42px]">{t('form2.title')}</h2>
      <div className="bg-[#D8DADC] backdrop-blur-[16px] w-full rounded-[16px] shadow-2xl opacity-100 p-5 text-[#16372D] relative z-40 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-5 [@media(max-width:420px)]:flex-wrap">
          <Button
            onClick={() => setTravellers_type(t('form2.btns.pl'))}
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl') === travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl')}
          </Button>
          <Button
            onClick={() => setTravellers_type(t('form2.btns.pl2'))}
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl2') === travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl2')}
          </Button>
          <Button
            onClick={() => setTravellers_type(t('form2.btns.pl3'))}
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl3') === travellers_type ? 'contained' : 'outlined'}
          >
            {t('form2.btns.pl3')}
          </Button>
          <Button
            onClick={() => setTravellers_type(t('form2.btns.pl4'))}
            sx={{ width: '100%', borderRadius: 2.5, minHeight: 45 }}
            variant={t('form2.btns.pl4') === travellers_type ? 'contained' : 'outlined'}
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
                onClick={() => setPerson(person + 1)}
              >
                <AddIcon fontSize="small" />
              </Button>
              <p className="w-[50px] text-[18px] text-center font-semibold">{person}</p>
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
                onClick={() => (days <= 1 ? setPerson(1) : setPerson(person - 1))}
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
                onClick={() => setChild(person + 1)}
              >
                <AddIcon fontSize="small" />
              </Button>
              <p className="w-[50px] text-[18px] text-center font-semibold">{child}</p>
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
                onClick={() => (days <= 1 ? setChild(1) : setChild(child - 1))}
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
            className="w-full flex items-center justify-start gap-5"
          >
            {check.map((el) => (
              <FormControlLabel
                key={el.title}
                value={el.title}
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
            placeholder={t('form2.pl4')}
          />
          <input
            type="text"
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
            placeholder={t('form2.pl5')}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-5">
          <input
            type="text"
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
            placeholder={t('form2.pl6')}
          />
          <input
            type="text"
            className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
            placeholder={t('form2.pl7')}
          />
        </div>
        <input
          type="text"
          className="bg-white py-[15px] rounded-[16px] px-[10px] w-full outline-none active:outline-none"
          placeholder={t('form2.pl8')}
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label={t('form2.pl9')} />
        <Button variant="contained" color="secondary" sx={{ minHeight: 45, borderRadius: 2 }}>
          {t('form2.btn')}
        </Button>
      </div>
    </div>
  );
};
