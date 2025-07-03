import { useLocale } from "next-intl";
import { AllToursCardType } from "./MainSection/_types";
import { useTranslations } from "use-intl";
import Image from "next/image";
import { Divider } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

export const HorizontalTourCard = ({ tour }: { tour: AllToursCardType }) => {
    const t = useTranslations('all_tours');
    const locale = useLocale();
    return (
        <div
            key={tour.id}
            className="grid grid-cols-[353px_1fr] grid-rows-[254px] items-center w-full bg-white rounded-[16px] shadow-2xl overflow-hidden h-full"
        >
            <div className="bg-[#16372D] w-full h-full overflow-hidden">
                {tour.photo.file && (
                    <Image
                        src={tour.photo.file}
                        alt={tour.photo.alt_text || tour.name || ''}
                        width={500}
                        height={300}
                        loading="lazy"
                        className="object-cover w-full h-full"
                    />
                )}
            </div>
            <div className="w-full p-5 grid grid-cols-1 grid-rows-3 gap-0 items-center h-full">
                <div className="flex flex-row justify-between">
                    <p className="mt-[-6rem] w-1/2 text-2xl font-semibold text-white sm:mt-0 sm:text-inherit line-clamp-2">
                        {tour.name}
                    </p>
                    <div className="price flex flex-row items-start gap-5">
                        <div className="flex flex-col justify-between gap-2 h-full">
                            <span className="price-begin text-custom-gray-500 text-md text-center">
                                {t('days')}
                            </span>
                            <span className="price-value text-custom-green-900 text-2xl font-bold">
                                {tour.days}
                            </span>
                        </div>
                        <Divider orientation="vertical" className="bg-gray-500-gray mx-5" />
                        <div className="flex flex-col justify-between gap-2 h-full">
                            {tour.price ? (

                                <>
                                    <span className="price-begin text-custom-gray-500 text-sm">
                                        {t('from')}
                                    </span>
                                    <span className="price-value text-custom-green-900 text-2xl font-bold">
                                        {tour?.valute ?? '$'} {tour.price}
                                    </span>
                                </>
                            ) : (
                                <span>{t('byRequest')}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 hidden items-center md:flex">
                    <div className="bg-[#CFDFD9] p-1 rounded-[10px]">
                        <IoLocationOutline size={34} />
                    </div>
                    <div className="ml-2">
                        <h5 className="text-md text-gray-900">{t('location')}</h5>
                        <p className="truncate overflow-hidden max-w-[400px] font-normal text-[#9B9B9B]">
                            {tour.destination.name}
                        </p>
                    </div>
                </div>
                <Link
                    className="bg-[#27A430] w-full text-center rounded-[16px] py-[10px] shadow-2xl text-white transition-all hover:bg-[#66B93E] active:bg-[#27A430] max-h-[50px]"
                    href={`/${locale}/${tour.destination.slug}/${tour.slug}`}
                >
                    {t('view_itinerary')}
                </Link>
            </div>
        </div>
    )
}