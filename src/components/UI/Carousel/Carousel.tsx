import Link from 'next/link';
import { BestSellersPackagesCardType } from '../BestSellersPackagesCard/_types';
import { apiGet } from '../../../utils/serverApi';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';

async function Carousel({ locale }: { locale: string }) {
  const data = (await apiGet(`tours?all=1&locale=${locale}`, {
    next: { revalidate: 60 * 5 },
  })) as BestSellersPackagesCardType[];

  if (!data?.length) return null;

  // Дублируем список 2 раза
  const duplicated = [...data, ...data, ...data];

  return (
    <div className="w-full overflow-hidden py-6 mt-[50px]">
      <ul className="carousel-track flex gap-4 w-max animate-carousel">
        {duplicated
          .filter((el) => el.photo.file)
          .map((product: BestSellersPackagesCardType, i: number) => (
            <li
              key={`${product.name}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3 rounded-[16px] overflow-hidden hover:border-4 hover:border-green-400 transition-all "
            >
              <Link
                href={`/${locale}/${product.destination.slug}/${product.slug}`}
                className="relative h-full w-full  flex items-center justify-center"
              >
                <p className="relative z-30 text-white text-[24px] p-3 text-center">
                  {product.name}
                </p>
                <div className="absolute inset-0 bg-black opacity-30 z-1 h-full" />
                {product?.photo?.file && (
                  <ImageWithFallback
                    src={product.photo.file}
                    alt={product.photo.alt_text || 'Image'}
                    fill
                    className="object-cover rounded-xl"
                  />
                )}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Carousel;
