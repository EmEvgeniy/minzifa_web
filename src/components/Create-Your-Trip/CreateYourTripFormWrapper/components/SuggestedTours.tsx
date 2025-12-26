'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGetQuery } from '@/api/get.api';
import { AllToursCardType } from '@/components/Tours/MainSection/_types';
import { PaginatedData } from '@/types';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback/ImageWithFallback';
import { FaArrowRight, FaLightbulb, FaMapMarkerAlt, FaCalendarAlt as FaCalendarDays } from 'react-icons/fa';

interface SuggestedToursProps {
    destinations: string[];
    days: number;
    hotelType: string;
    locale: string;
    onRequestCustomTour?: () => void;
}

export const SuggestedTours = ({
    destinations,
    days,
    hotelType,
    locale,
    onRequestCustomTour,
}: SuggestedToursProps) => {
    const t = useTranslations('createYourTrip');

    // Build filter query
    const filterQuery = useMemo(() => {
        const params: string[] = [];

        // Destinations filter
        if (destinations && destinations.length > 0) {
            destinations.forEach((dest) => {
                params.push(`destinations[]=${encodeURIComponent(dest)}`);
            });
        }

        // Duration filter (only apply if days > 1, use days[] format like main filter)
        if (days && days > 1) {
            const minDays = Math.max(1, days - 2);
            const maxDays = days + 2;
            params.push(`days[]=${minDays}`);
            params.push(`days[]=${maxDays}`);
        }

        // Hotel filter - only apply for specific stars or boutique-hotel
        const filterableHotels = ['boutique-hotel', '3 stars', '4 stars', '5 stars'];
        if (hotelType && filterableHotels.includes(hotelType)) {
            params.push(`hotels[]=${encodeURIComponent(hotelType)}`);
        }

        return params.length > 0 ? `&${params.join('&')}` : '';
    }, [destinations, days, hotelType]);

    // Only fetch if destination is selected (main filter)
    const shouldFetch = destinations.length > 0;

    const { data: response, isLoading } = useGetQuery<PaginatedData<AllToursCardType>>({
        key: ['suggested_tours', filterQuery],
        page: '1',
        perPage: '6',
        url: 'tours',
        searchItem: '',
        additionalParam: filterQuery,
        enabled: shouldFetch,
    });

    const tours = response?.data || [];
    const totalTours = response?.meta?.total || tours.length;

    // Build URL for "All tours" link with filters
    const allToursUrl = useMemo(() => {
        const params = new URLSearchParams();

        destinations.forEach((dest) => {
            params.append('destinations[]', dest);
        });

        if (days > 1) {
            const minDays = Math.max(1, days - 2);
            const maxDays = days + 2;
            params.append('days[]', String(minDays));
            params.append('days[]', String(maxDays));
        }

        const filterableHotels = ['boutique-hotel', '3 stars', '4 stars', '5 stars'];
        if (hotelType && filterableHotels.includes(hotelType)) {
            params.append('hotels[]', hotelType);
        }

        const queryString = params.toString();
        return `/${locale}/tours${queryString ? `?${queryString}` : ''}`;
    }, [destinations, days, hotelType, locale]);

    // Don't render if no destination selected
    if (!shouldFetch) {
        return null;
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="w-full">
                <div className="flex items-center gap-2 mb-4">
                    <FaLightbulb className="text-yellow-500" size={20} />
                    <h3 className="font-semibold text-lg text-[#16372D]">
                        {t('suggestedTours.loading')}
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    // No results
    if (tours.length === 0) {
        return (
            <div className="w-full bg-gray-50/50 rounded-2xl p-4 md:p-6 text-center border-2 border-dashed border-gray-100">
                <FaLightbulb className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-base font-bold text-[#16372D] mb-1">
                    {t('suggestedTours.noResults.title')}
                </p>
                <p className="text-gray-500 text-xs mb-3">
                    {t('suggestedTours.noResults.text')}
                </p>
                {onRequestCustomTour && (
                    <button
                        type="button"
                        onClick={onRequestCustomTour}
                        className="px-5 py-2.5 bg-[#27A430] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#1f8a26] transition-all"
                    >
                        {t('customTour.button')}
                    </button>
                )}
            </div>
        );
    }

    // Tours found
    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#27A430] to-[#1f8a26] rounded-xl flex items-center justify-center shadow-md">
                    <FaLightbulb className="text-white" size={18} />
                </div>
                <h3 className="text-xl font-bold text-[#16372D]">
                    {t('suggestedTours.title')} ({totalTours})
                </h3>
            </div>

            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide md:overflow-visible md:pb-0">
                {tours.map((tour) => (
                    <div key={tour.id} className="min-w-[280px] flex-shrink-0 md:min-w-0 md:flex-shrink snap-start">
                        <TourMiniCard tour={tour} locale={locale} />
                    </div>
                ))}
            </div>

            {totalTours > 6 && (
                <div className="text-center mt-4">
                    <Link
                        href={allToursUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#27A430]/10 text-[#27A430] font-medium rounded-xl hover:bg-[#27A430]/20 transition-colors"
                    >
                        {t('suggestedTours.showAll', { count: totalTours })}
                        <FaArrowRight size={14} />
                    </Link>
                </div>
            )}

            <p className="text-center text-gray-500 text-sm mt-4">
                {t('suggestedTours.orContinue')}
            </p>
        </div>
    );
};

// Mini tour card component
const TourMiniCard = ({ tour, locale }: { tour: AllToursCardType; locale: string }) => {
    const t = useTranslations();
    const href = `/${locale}/${tour?.destination?.slug}/${tour?.slug}`;

    const tourPhotoFile = tour?.photo?.file;
    const isValidPhoto = tourPhotoFile && !tourPhotoFile.endsWith('/uploads/') && !tourPhotoFile.endsWith('/');

    return (
        <Link href={href} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-[#27A430]/30 group-hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative h-36 overflow-hidden">
                    <ImageWithFallback
                        src={isValidPhoto ? tourPhotoFile : ''}
                        alt={tour?.photo?.alt_text || tour?.name || 'Tour'}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Tour type badge */}
                    {tour?.tour_type && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                            {t(`common.tourTypes.${tour?.tour_type}`)}
                        </div>
                    )}

                    {/* Days badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#27A430] rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <FaCalendarDays size={10} />
                        {tour?.days} {t('common.tourCard.days')}
                    </div>

                    {/* Tour name */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-bold line-clamp-2 drop-shadow-lg">
                            {tour?.name}
                        </p>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-4">
                    {/* Destination */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                        <FaMapMarkerAlt size={10} className="text-[#27A430]" />
                        <span>{tour?.destination?.name || tour?.destinations}</span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">{t('common.tourCard.from')}</p>
                            <p className="text-lg font-bold text-[#16372D]">
                                {t('common.currencies.' + tour?.valute) || tour?.valute}{tour?.price?.toLocaleString()}
                            </p>
                        </div>
                        <div className="w-9 h-9 bg-[#27A430] rounded-full flex items-center justify-center text-white group-hover:bg-[#1f8a26] transition-colors">
                            <FaArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    );
};

export default SuggestedTours;
