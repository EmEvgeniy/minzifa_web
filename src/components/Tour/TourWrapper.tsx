import dynamic from 'next/dynamic';
import { Tour } from './_types';
import { CreateYourTripForm } from '../UI/CreateYourTripForm/CreateYourTripForm';
import TourTitle from './TourTitle/TourTitle';
import { redirect } from 'next/navigation';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { getTranslations } from 'next-intl/server';
import { getApiUrl } from '@/utils/config';

const Reviews = dynamic(() => import('../UI/Reviews/Reviews'));
const TourHighlights = dynamic(() => import('./TourHighlights/TourHighlights'));
const TourGallery = dynamic(() => import('./TourGallery/TourGallery'));
const TourFacts = dynamic(() => import('./TourFacts/TourFacts'));
const TourDescription = dynamic(() => import('../UI/MarkdownDescription/MarkdownDescription'));
const TourItinerary = dynamic(() => import('./TourItinerary/TourItinerary'));
const TourAccomodation = dynamic(() => import('./TourAccomodation/TourAccomodation'));
const FreeConsultationForm = dynamic(
  () => import('../UI/FreeConsultationForm/FreeConsultationForm'),
);
const TourIncludes = dynamic(() => import('./TourIncludes/TourIncludes'));
const TourBookingWrapper = dynamic(() => import('./TourBooking/TourBookingWrapper'));
const TourPricesContainer = dynamic(() => import('./TourPrices/TourPricesContainer'));
const MobileBtn = dynamic(() => import('./MobileBtn/MobileBtn'));
const DescForm = dynamic(() => import('./../UI/CreateYourTripForm/DescForm'));
const TourPrivateModal = dynamic(() => import('./TourPrivateModal/TourPrivateModal'));
const Transport = dynamic(() => import('./Transport/Transport'));

export default async function TourWrapper({ locale, slug }: { locale: string; slug: string }) {
  const t = await getTranslations({ locale, namespace: 'Tour' });

  const tourData = (await fetch(getApiUrl(`tours/${slug}?locale=${locale}`), {
    next: { revalidate: 60 * 20 },
  }).then((res) => res.json())) as Tour;

  if (!tourData?.id) redirect(`/${locale}`);

  if (tourData?.photo) {
    tourData?.gallery.unshift(tourData?.photo);
  }

  return (
    <div className="w-full min-h-[200vh]">
      <div className={"container !px-0 pt-[150px] flex flex-col gap-10 max-[920px]:pt-[56px]"}>
        <Breadcrumbs
          locale={locale}
          link={{ title: t('breadcrumbs.all_tours'), link: `/${locale}/tours` }}
          link2={{ title: tourData.name, link: '' }}
          mainStyle='hidden md:block'
        />
        <div className="w-full block max-[920px]:hidden">
          <TourTitle title={tourData?.name} />
        </div>
        <TourGallery images={tourData?.gallery} />
        <div className="w-full hidden container max-[920px]:block">
          <TourTitle title={tourData?.name} />
        </div>
        <div className={"container md:!px-0 md:grid md:grid-flow-row-dense md:grid-cols-[720px_370px] md:justify-between md:gap-5"}>
          <div className="flex flex-col gap-5 w-full h-full">
            <TourFacts facts={tourData?.facts} locale={locale} />
            <TourDescription
              subtitle={tourData?.subtitle}
              description={tourData?.description}
              className="md:col-start-1 max-[920px]:gap-5 max-[920px]:py-5"
            />
          </div>
          <div className='md:hidden'>
            <TourBookingWrapper tour={tourData} />
          </div>
          <TourHighlights highlights={tourData?.hightlights} />
          <TourItinerary itineraries={tourData?.itineraries} locale={locale} />
          <div id="free-consultation" className="col-span-2 z-40 h-fit">
            <FreeConsultationForm />
          </div>
          <TourIncludes includes={tourData?.includes} locale={locale} />
          <TourAccomodation hotels={tourData.hotels} locale={locale} />
          <div className={'hidden md:block sticky top-36 z-30'}>
            <TourBookingWrapper tour={tourData} />
          </div>
          <Transport locale={locale} />
        </div>
        <TourPricesContainer tour={tourData} />
        <Reviews locale={locale} />
        {locale === 'en' ? (
          <DescForm className="mb-10" locale="en" />
        ) : (
          <CreateYourTripForm className="mb-10" locale={locale} />
        )}
      </div>
      <MobileBtn locale={locale} tour={tourData} />
      <TourPrivateModal locale={locale} tour={tourData} />
    </div>
  );
}
