'use client';

import { useLocale } from 'next-intl';
import { FormattedPriceProps } from './_types';
import React from 'react';

export const FormattedPrice = ({
  price,
  currency = 'USD',
  className = '',
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  as = 'span',
}: FormattedPriceProps) => {
  const locale = useLocale();
  const formatted = price?.toLocaleString(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  if (typeof price !== 'number' || isNaN(price)) {
    // console.error("Invalid price value provided to FormattedPrice:", price);
    return React.createElement(as, { className }, '');
  }

  return React.createElement(as, { className }, formatted);
};
