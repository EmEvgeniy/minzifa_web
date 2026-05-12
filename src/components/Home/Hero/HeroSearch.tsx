'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { ru, enGB } from 'date-fns/locale';
import { RiSearch2Line } from 'react-icons/ri';
import { DestinationCard } from '../Destinations/_types';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Form';
import { FaLocationDot } from 'react-icons/fa6';
import { FaHistory, FaSearch } from 'react-icons/fa';
import useClickOutside from '@/hooks/useClickOutside';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/UI/CustomDatepicker/CustomDatepicker.scss';
import { useSearchToursQuery } from '@/api/get.api';
import { LuMapPin, LuCalendarDays } from 'react-icons/lu';
import { cn } from '@/utils';

// ============================================================================
// Types & Constants
// ============================================================================

interface SearchHistory {
  destination: string;
  dateFrom?: string;
  dateTo?: string;
  timestamp: number;
}

interface SearchFormData {
  destination: string;
  dateRange: [Date | null, Date | null];
}

interface SearchItem {
  id: number;
  name: string;
  type: 'destination' | 'tour';
}

const STORAGE_KEY = 'minzifa_search_history';
const MAX_HISTORY = 5;
const QUERY_PARAMS = {
  DESTINATION: 'destinations[]',
  DATE_FROM: 'date_from',
  DATE_TO: 'date_to',
} as const;

// ============================================================================
// Component
// ============================================================================

export default function HeroSearch({ data }: { data: DestinationCard[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  // --- State ---

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutside(() => {
    setShowDropdown(false);
  });

  const [formData, setFormData] = useState<SearchFormData>({
    destination: '',
    dateRange: [null, null],
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  // --- Initialize History from LocalStorage ---

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  // --- Data Fetching ---

  const { data: toursData } = useSearchToursQuery(formData.destination, locale);

  // --- Computed Data ---

  const filteredDestinations = useMemo(() => {
    if (!formData.destination) return data?.slice(0, 5) || [];
    const search = formData.destination.toLowerCase();
    return data?.filter((d) => d.name.toLowerCase().includes(search) && d.tours_count > 0) || [];
  }, [data, formData.destination]);

  const searchResults = useMemo((): SearchItem[] => {
    if (!formData.destination || formData.destination.length < 2) return [];

    const items: SearchItem[] = [];
    const tourNames = new Set<string>();

    if (toursData?.data) {
      toursData.data.forEach((tour) => {
        items.push({ id: tour.id, name: tour.name, type: 'tour' });
        tourNames.add(tour.name);
      });
    }

    filteredDestinations.forEach((dest) => {
      if (!tourNames.has(dest.name)) {
        items.push({ id: dest.id, name: dest.name, type: 'destination' });
      }
    });

    return items.slice(0, 8);
  }, [formData.destination, toursData, filteredDestinations]);

  const slicedHistory = useMemo(() => searchHistory.slice(0, 3), [searchHistory]);

  // --- Date Formatting Utilities ---

  const formatDate = useCallback(
    (date: Date | null): string => {
      if (!date) return '';
      const dateLocale = locale === 'en' ? enGB : ru;
      return format(date, 'yyyy-MM-dd', { locale: dateLocale });
    },
    [locale],
  );

  const formatDisplayDate = useCallback(
    (dateStr: string): string => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const dateLocale = locale === 'en' ? enGB : ru;
      return format(date, locale === 'en' ? 'yyyy-MM-dd' : 'dd.MM.yyyy', { locale: dateLocale });
    },
    [locale],
  );

  // --- History Management ---

  const saveToHistory = useCallback(
    (destination: string, dateFrom?: Date, dateTo?: Date) => {
      if (!destination) return;

      const newEntry: SearchHistory = {
        destination,
        dateFrom: dateFrom ? formatDate(dateFrom) : undefined,
        dateTo: dateTo ? formatDate(dateTo) : undefined,
        timestamp: Date.now(),
      };

      const updated = [
        newEntry,
        ...searchHistory.filter((h) => h.destination !== destination),
      ].slice(0, MAX_HISTORY);

      setSearchHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [searchHistory, formatDate],
  );

  // --- Navigation Helpers ---

  const navigateToTours = useCallback(
    (destination: string, dateFrom?: Date, dateTo?: Date) => {
      const params = new URLSearchParams();
      if (destination) {
        params.append(QUERY_PARAMS.DESTINATION, destination);
      }
      if (dateFrom) {
        params.append(QUERY_PARAMS.DATE_FROM, formatDate(dateFrom));
      }
      if (dateTo) {
        params.append(QUERY_PARAMS.DATE_TO, formatDate(dateTo));
      }
      const queryString = params.toString();
      const url = `/${locale}/tours${queryString ? `?${queryString}` : ''}`;
      router.push(url);
    },
    [locale, formatDate, router],
  );

  const navigateToTour = useCallback(
    (tourId: number) => {
      router.push(`/${locale}/tour/${tourId}`);
    },
    [locale, router],
  );

  // --- Form & Input Handlers ---

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.destination) return;

      saveToHistory(
        formData.destination,
        formData.dateRange[0] ?? undefined,
        formData.dateRange[1] ?? undefined,
      );
      navigateToTours(
        formData.destination,
        formData.dateRange[0] ?? undefined,
        formData.dateRange[1] ?? undefined,
      );
    },
    [formData, saveToHistory, navigateToTours],
  );

  const handleHistorySelect = useCallback(
    (history: SearchHistory) => {
      const dateFrom = history.dateFrom ? new Date(history.dateFrom) : undefined;
      const dateTo = history.dateTo ? new Date(history.dateTo) : undefined;
      navigateToTours(history.destination, dateFrom, dateTo);
    },
    [navigateToTours],
  );

  const handleDestinationSelect = useCallback((destName: string) => {
    setFormData((prev) => ({ ...prev, destination: destName }));
    setShowDropdown(false);
  }, []);

  const handleSearchSelect = useCallback(
    (item: SearchItem) => {
      if (item.type === 'tour') {
        navigateToTour(item.id);
      } else {
        setFormData((prev) => ({ ...prev, destination: item.name }));
        setShowDropdown(false);
      }
    },
    [navigateToTour],
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, destination: value }));
    setShowDropdown(true);
  }, []);

  const handleInputFocus = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }, []);

  // --- Derived Display Values ---

  const dateFormat = locale === 'en' ? 'yyyy-MM-dd' : 'dd.MM.yyyy';

  const [startDate, endDate] = formData.dateRange;
  const dateDisplayValue = useMemo(() => {
    if (!startDate) return '';
    return endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : formatDate(startDate);
  }, [startDate, endDate, formatDate]);

  // --- Render ---

  return (
    <div className={cn('px-2.5 mx-auto relative w-full', 'md:px-0 md:max-w-[1100px]')}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-3 w-full flex flex-col gap-2 md:flex-row md:items-center rounded-[12px] lg:rounded-5xl shadow-[0px_0px_32px_0px_rgba(0,0,0,0.25)]"
      >
        {/* Destination Input */}
        <div className="flex-1 relative" ref={dropdownRef}>
          <Input
            value={formData.destination}
            startIcon={<LuMapPin size={21} className="text-foreground" />}
            placeholder={t('home.hero_search.where')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            variant="borderless"
            className={cn('border border-foreground/12 rounded-[12px]', 'md:border-0 md:py-3')}
          />

          {showDropdown && (
            <div className="absolute z-40 top-full left-0 right-0 mt-5 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden max-h-[300px] overflow-y-auto">
              {/* Search Results Section */}
              {formData.destination && formData.destination.length >= 2 && (
                <>
                  {searchResults.length > 0 && (
                    <div className="px-4 py-2 text-xs text-gray-500 flex items-center gap-2 border-b">
                      <RiSearch2Line size={21} className="text-foreground" />
                      {t('home.hero_search.tours')}
                    </div>
                  )}
                  {searchResults.map((item) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      onClick={() => handleSearchSelect(item)}
                    >
                      {item.type === 'tour' ? (
                        <RiSearch2Line className="text-gray-400 w-4 h-4" />
                      ) : (
                        <FaLocationDot className="text-gray-400 w-4 h-4" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-400">
                          {item.type === 'tour'
                            ? t('home.hero_search.tour')
                            : t('home.hero_search.destination')}
                        </span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* History Section */}
              {!formData.destination && slicedHistory.length > 0 && (
                <>
                  <div className="px-5 py-3 text-sm text-content uppercase">
                    {t('home.hero_search.recent_searches')}
                  </div>
                  {slicedHistory.map((history, idx) => (
                    <button
                      key={`hist-${idx}`}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      onClick={() => handleHistorySelect(history)}
                    >
                      <FaHistory size={18} className="text-foreground/50" />
                      <div className="flex flex-col">
                        <span className="text-gray-900">{history.destination}</span>
                        <span className="text-xs text-gray-400">
                          {history.dateFrom && formatDisplayDate(history.dateFrom)}
                          {history.dateFrom && history.dateTo && ' - '}
                          {history.dateTo && formatDisplayDate(history.dateTo)}
                        </span>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Popular Destinations Section */}
              <div className="px-5 py-3 text-sm text-content uppercase">
                {t('home.hero_search.popular_destinations')}
              </div>
              {filteredDestinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => handleDestinationSelect(dest.name)}
                >
                  <FaSearch className="text-foreground/50 w-4 h-4" />
                  <span className="text-gray-900">{dest.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden border border-foreground/12 h-[42px] md:block" />

        {/* Date Picker */}
        <div className="flex-1 relative w-full">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(dates: [Date | null, Date | null] | null) =>
              setFormData((prev) => ({ ...prev, dateRange: dates ?? [null, null] }))
            }
            minDate={new Date()}
            monthsShown={2}
            dateFormat={dateFormat}
            placeholderText={t('home.hero_search.date')}
            className={cn('border border-foreground/12 rounded-[12px]', 'md:border-0 md:py-3')}
            popperClassName="!z-50"
            customInput={
              <Input
                type="text"
                value={dateDisplayValue}
                placeholder={t('home.hero_search.date')}
                className="w-full h-full bg-transparent outline-none text-gray-900 text-base placeholder-gray-400 rounded-md px-4 pl-12 py-3"
                readOnly
                variant="borderless"
                startIcon={<LuCalendarDays size={21} className="text-foreground" />}
              />
            }
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">
          {t('common.search')}
          <RiSearch2Line size={16} />
        </Button>
      </form>
    </div>
  );
}
