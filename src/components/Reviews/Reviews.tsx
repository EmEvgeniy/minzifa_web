'use client';

import { useTranslations } from 'next-intl';
import YoutubeReel from './YoutubeReel';
import { EmblaCarousel, NextButton, PrevButton } from '../UI/EmblaCarousel';
import { useState } from 'react';
import { usePrevNextButtons } from '../UI/EmblaCarousel/usePrevNextButtons';
import { EmblaCarouselType } from 'embla-carousel';


export interface IVideoReview {
    id: number;
    lang: string;
    url: string;
}

type ReviewsProps = {
    reviews: IVideoReview[];
}

export default function Reviews({ reviews }: ReviewsProps) {
    const t = useTranslations('reviewsPage');

    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    return (
        <div className='relative mb-10 flex flex-col gap-5'>
            <h2 className='text-3xl font-semibold'>{t('subtitle')}</h2>
            <EmblaCarousel
                slides={reviews}
                className="gap-5"
                onInit={setEmblaApi}
                renderSlide={(review) => (
                    <YoutubeReel
                        key={review.id}
                        url={review.url}
                    />
                )}
            />

            <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="absolute top-1/2 left-1 text-foreground bg-white/70 hover:bg-white/90 text-2xl z-10"
            />

            <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="absolute top-1/2 right-1 text-foreground bg-white/70 hover:bg-white/90 text-2xl z-10"
            />

        </div>
    );
}