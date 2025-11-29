import { TravelChoice_Black } from '@/assets/img';
import { FaStar } from 'react-icons/fa6';
import ReviewsInner from './ReviewsInner';
import { getTranslations } from 'next-intl/server';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

export default async function Reviews({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.reviews' });

  const rating = 5.0;
  const fullStars = Math.floor(rating);
  const starsArray = Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      size={27}
      className={
        i < fullStars ? 'text-[#009F65] max-[1024px]:size-4' : 'text-[#ccc] max-[1024px]:size-4'
      }
    />
  ));

  return (
    <section className="relative container">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h2
            className="text-4xl font-semibold mb-4 max-[1024px]:text-[35px] max-[550px]:text-[24px]"
            aria-label={t('title')}
          >
            {t('title')}
          </h2>
          <div className="flex flex-row items-center gap-5">
            <p className="font-title text-[56px] max-[1024px]:text-[35px] max-[768px]:text-[30px]">
              {rating.toFixed(1)}
            </p>
            <div>
              <div className="flex flex-row gap-3">{starsArray}</div>
              <div className="text-2xl text-[#666666] font-normal max-[1024px]:text-[20px]">
                {t('count', { count: 456 })}
              </div>
            </div>
          </div>
        </div>
        <ImageWithFallback
          src={TravelChoice_Black}
          alt="info_img"
          width={611}
          height={97}

        />
      </div>

      <ReviewsInner />
    </section>
  );
}
