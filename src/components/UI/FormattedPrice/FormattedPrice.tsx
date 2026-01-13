'use client';

import React, { memo, useMemo } from 'react';
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
    suffix, // "per person" или "за человека"
  }: FormattedPriceProps) => {
    const locale = useLocale();
    const numericPrice = Number(price);

    // --- 1. Логика форматирования (Intl) ---
    const parts = useMemo(() => {
      if (isNaN(numericPrice)) return [];

      try {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          // Просим 'narrowSymbol' ($), чтобы самим добавить буквы (US, AU)
          currencyDisplay: 'narrowSymbol',
          minimumFractionDigits,
          maximumFractionDigits,
        });
        return formatter.formatToParts(numericPrice);
      } catch {
        return [];
      }
    }, [numericPrice, locale, currency, minimumFractionDigits, maximumFractionDigits]);

    // --- 2. Рендеринг ---

    // Если цена невалидна
    if (isNaN(numericPrice)) {
      return returnAsString ? '' : React.createElement(as, { className }, '');
    }

    // Если Intl сломался, возвращаем простой фоллбек
    if (!parts.length) {
      const fallback = `${numericPrice} ${currency}${suffix ? ` ${suffix}` : ''}`;
      return returnAsString
        ? fallback
        : React.createElement(as, { className }, fallback);
    }

    // Рендер одной части цены
    const renderPart = (part: Intl.NumberFormatPart, index: number) => {
      if (part.type === 'currency') {
        const symbol = part.value;

        // УМНЫЙ ДОЛЛАР: Если символ "$", добавляем код страны (US, AU, CA)
        if (symbol === '$') {
          const countryPrefix = currency.slice(0, 2); // US, AU, CA

          if (returnAsString) return `${countryPrefix} ${symbol}`;

          return (
            <React.Fragment key={index}>
              <span className='text-[0.6em] mr-1 font-medium'>
                {countryPrefix}
              </span>
              {symbol}
            </React.Fragment>
          );
        }
        // Для остальных (EUR, UZS)
        return returnAsString ? symbol : <span key={index}>{symbol}</span>;
      }

      // Цифры и разделители
      return returnAsString ? part.value : <span key={index}>{part.value}</span>;
    };

    // --- 3. Сборка всего вместе (Цена + Суффикс) ---

    if (returnAsString) {
      const priceStr = parts.map((part, i) => renderPart(part, i)).join('');
      return suffix ? `${priceStr} ${suffix}` : priceStr;
    }

    return React.createElement(as, { className },
      <>
        {/* Цена */}
        {parts.map((part, i) => renderPart(part, i))}

        {/* Суффикс (per person) */}
        {suffix && (
          <span className='text-[0.6em] ml-1 font-medium'>
            {suffix}
          </span>
        )}
      </>
    );
  },
);

FormattedPrice.displayName = 'FormattedPrice';

export default FormattedPrice;