'use client';

import React, { FC } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { ru, enGB } from 'date-fns/locale';
// import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatepicker.scss';

type Props = {
  locale: string;
  label?: string;
  icon?: React.ReactNode;
} & DatePickerProps;

export const CustomDatepicker: FC<Props> = ({ locale, label, icon, ...rest }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-gray-800">{label}</label>}

      <div className="relative">
        <DatePicker
          locale={locale === 'ru' ? ru : enGB}
          calendarClassName="react-datepicker"
          popperClassName="!z-50"
          icon={icon}
          {...rest}
        />
      </div>
    </div>
  );
};
