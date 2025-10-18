'use client';

import React, { memo } from 'react';
import { useLocale } from 'next-intl';
import { FormattedPriceProps } from './_types';

const FormattedPrice = memo(
  ({
    price,
    currency = 'USD',
    className = '',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    as = 'span',
    returnAsString = false,
  }: FormattedPriceProps) => {
    const locale = useLocale();
    const numericPrice = Number(price);

    if (isNaN(numericPrice)) {
      return returnAsString ? '' : React.createElement(as, { className }, '');
    }

    let formatted = '';

    try {
      formatted = numericPrice.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
      });
    } catch {
      formatted = `${numericPrice} ${currency}`;
    }

    if (returnAsString) {
      return formatted;
    }

    return React.createElement(as, { className }, formatted);
  },
);

FormattedPrice.displayName = 'FormattedPrice';

export default FormattedPrice;
