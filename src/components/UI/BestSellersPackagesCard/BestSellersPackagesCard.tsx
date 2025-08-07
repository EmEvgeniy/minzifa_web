import type { BestSellersPackagesCardType } from './_types';
import Image from 'next/image';
import Link from 'next/link';
import BestSellersFavoriteBtn from './BestSellersFavoriteBtn';

type Props = {
  slide: BestSellersPackagesCardType;
  locale: string;
  days: string;
  from: string;
  byRequest: string;
  view_itinerary: string;
};

export default function BestSellersPackagesCard({
  slide,
  locale,
  days,
  from,
  byRequest,
  view_itinerary,
}: Props) {
  const href = `/${locale}/${slide?.destination?.slug}/${slide?.slug}`;

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Image Block */}
      <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] min-h-[250px]">
        <Link href={href}>
          <div className="absolute inset-0 z-10" />
        </Link>
        <BestSellersFavoriteBtn tour={slide} />
        <div className="absolute inset-0 bg-black opacity-15 z-1" />
        <Image
          src={slide?.photo?.file}
          alt={slide?.photo?.alt_text || 'Minzifa Travel'}
          fill
          loading="lazy"
          className="object-cover"
        />
        <p className="z-20 text-white absolute bottom-0 left-0 p-5 text-ellipsis text-[20px] font-bold max-w-full">
          {slide?.name}
        </p>
      </div>

      {/* Info Block */}
      <div className="p-[10px] flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-[18px] text-black">
            <span>{slide?.days}</span>
            <span>{days}</span>
          </p>
          <p className="flex items-center gap-1.5 text-[18px] text-black">
            {slide?.price ? (
              <>
                <span className="text-[#464646]">{from}</span>
                <span className="font-semibold text-[24px] text-black">
                  {slide?.valute ?? '$'} {slide?.price}
                </span>
              </>
            ) : (
              <span>{byRequest}</span>
            )}
          </p>
        </div>
        <Link
          href={href}
          className="bg-[#27A430] px-[15px] py-[12px] text-white text-[14px] rounded-[16px] shadow-[0_0_10px_rgba(0,0,0,0.3)] text-base"
        >
          {view_itinerary}
        </Link>
      </div>
    </div>
  );
}

