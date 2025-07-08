import dynamic from 'next/dynamic';
import Image from 'next/image';
import { TourImage } from '../_types';
import { getTranslations } from 'next-intl/server';

const GalleryBtn = dynamic(() => import('./GalleryBtn'));
const GallerySlider = dynamic(() => import('./GallerySlider'));

interface TourGalleryProps {
  images: TourImage[] | undefined;
  tourName: string | undefined;
  locale: string;
}

export default async function TourGallery({ images, tourName, locale }: TourGalleryProps) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  if (!images) return null;

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`relative grid min-h-[460px] max-h-[460px] w-full gap-6  max-[920px]:grid-cols-1 max-[550px]:min-h-[300px] ${
          images?.length === 1
            ? 'grid-cols-1 md:grid-rows-1'
            : 'grid-cols-[1fr_1fr_445px] md:grid-rows-2'
        }`}
      >
        <div
          className={`rounded-2xl col-span-2 w-full  relative ${
            images?.length === 1 ? 'row-span-1' : 'row-span-2'
          } overflow-hidden`}
        >
          <Image
            fill
            loading="lazy"
            quality={100}
            className="object-cover"
            src={images[0]?.file}
            alt={images[0]?.alt_text || ''}
          />
        </div>
        {images[1] && (
          <div className="rounded-2xl col-span-1 row-span-1 overflow-hidden max-[920px]:hidden">
            <Image
              width={800}
              height={460}
              loading="lazy"
              quality={100}
              className="h-full w-full object-cover"
              src={images[1]?.file}
              alt={images[1]?.alt_text || ''}
            />
          </div>
        )}
        {images[2] && (
          <div className="rounded-2xl col-span-1 row-span-1 overflow-hidden max-[920px]:hidden">
            <Image
              width={800}
              height={460}
              loading="lazy"
              quality={100}
              className="h-full w-full object-cover"
              src={images[2]?.file}
              alt={images[2]?.alt_text || ''}
            />
          </div>
        )}
        <GalleryBtn btn={t('gallery.button', { count: images.length - 3 })} images={images} />
      </div>
      <GallerySlider images={images} tourName={tourName} />
    </div>
  );
}
