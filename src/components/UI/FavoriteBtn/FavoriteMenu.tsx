'use client';

import { useFavoriteStore } from './store';
import { useLocale, useTranslations } from 'next-intl';
import BestSellersPackagesCard from '../BestSellersPackagesCard/BestSellersPackagesCard';
import { BestSellersPackagesCardType } from '../BestSellersPackagesCard/_types';
import Link from 'next/link';
import { IoMdCloseCircle } from 'react-icons/io';

function FavoriteMenu() {
  const t = useTranslations();
  const { setActive, tours, active } = useFavoriteStore((state) => state);
  const locale = useLocale();

  const handleClose = () => setActive(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {active && tours?.length && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        />
      )}

      {/* Right Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[450px] max-[1024px]:w-[350px] bg-[#16372D] transform transition-transform duration-300 ease-in-out z-50 ${
          tours?.length && active ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Link href={`/${locale}/favorites`} className="text-white underline text-2xl">
              {t('favoriteBtn')}
            </Link>
            <button
              type="button"
              onClick={handleClose}
              className="text-white hover:scale-110 active:scale-95 transition-all"
            >
              <IoMdCloseCircle size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {tours.length
              ? tours.map((tour: BestSellersPackagesCardType, i) => (
                  <div key={i} className="mb-4">
                    <BestSellersPackagesCard
                      slide={tour}
                      locale={locale}
                      days={t('all_tours.days')}
                      from={t('all_tours.from')}
                      view_itinerary={t('all_tours.view_itinerary')}
                      byRequest={t('all_tours.byRequest')}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteMenu;
