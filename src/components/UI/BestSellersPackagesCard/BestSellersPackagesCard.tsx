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
    <div className="max-w-full min-h-[470px] rounded-2xl overflow-hidden bg-white w-full h-full shadow-xl max-[450px]:min-h-[270px]">
      <div className="relative min-h-[372px] max-h-[372px] h-full w-full max-[450px]:min-h-[270px]">
        <Link href={href}>
          <div className="absolute inset-0 z-10" />
        </Link>
        <BestSellersFavoriteBtn tour={slide} />
        <div className="absolute inset-0 bg-black opacity-15 z-1 h-full" />
        {slide?.photo?.file && (
          <Image
            src={slide?.photo?.file || ''}
            alt={slide?.photo?.alt_text || 'Minzifa Travel'}
            fill
            loading="lazy"
            className="absolute w-full h-full object-cover"
          />
        )}
        <p className="z-2 text-white absolute bottom-0 left-0 p-5 text-ellipsis text-[20px] font-bold max-w-full [@media(max-width:450px)]:max-w-full">
          {slide?.name}
        </p>
      </div>
      <div className="p-[10px] flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="flex items-center justify-start gap-1.5 text-[18px] text-black">
            <span>{slide?.days}</span>
            <span>{days}</span>
          </p>
          <p className="flex items-center justify-start gap-1.5 text-[18px]">
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
          className="bg-[#27A430] px-[15px] py-[12px] text-white text-[14px] rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] text-base"
        >
          {view_itinerary}
        </Link>
      </div>
    </div>
  );
}
