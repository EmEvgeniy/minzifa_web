import ImageWithFallback from "@/components/UI/ImageWithFallback/ImageWithFallback";
import IconInfo from '../../../assets/icons/booking/exclamationmark.circle.svg';

export default async function Transport({ locale }: { locale: string }) {
    return (
        <div className="col-start-1 flex flex-col gap-5">
            <h2 className="text-4xl font-semibold text-black mb-5 max-[920px]:text-[30px] max-[550px]:text-[24px] max-[550px]:mb-3">
                {locale === 'en' ? 'Transport' : 'Транспорт'}
            </h2>

            <div className="table w-full rounded-2xl bg-white overflow-hidden">
                <div className="bg-[#EDEDED] table-header-group">
                    <div className="table-row font-semibold uppercase text-base">
                        <div className="table-cell p-4">{locale === 'en' ? 'Group size' : 'Размер группы'}</div>
                        <div className="table-cell p-4">{locale === 'en' ? 'Name of transport' : 'Название транспорта'}</div>
                    </div>
                </div>
                <div className="table-row-group text-lg font-normal">
                    <div className="table-row">
                        <div className="table-cell p-4 border-b border-gray-100">{locale === 'en' ? '1-2 people' : '1-2 человека'}</div>
                        <div className="table-cell p-4 border-b border-gray-100">Chevrolet Lacetti</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell p-4 border-b border-gray-100">{locale === 'en' ? '3-5 people' : '3-5 человек'}</div>
                        <div className="table-cell p-4 border-b border-gray-100">Hyundai Starex / Toyota Hiace</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell p-4">{locale === 'en' ? '6-12 people' : '6-12 человек'}</div>
                        <div className="table-cell p-4">Mercedes Sprinter</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#E2FFF4] p-5 rounded-2xl flex flex-row gap-2.5 items-center text-lg max-[920px]:text-[12px] max-[550px]:p-2.5 max-[550px]:text-[12px]">
                <ImageWithFallback
                    src={IconInfo}
                    alt="info"
                    width={30}
                    height={30}
                    className="w-5 h-5 md:w-7.5 md:h-7.5"
                />
                <span>{locale === 'en' ? 'At the customer\'s request, it is possible to upgrade the car class and add child seats.' : 'По желанию клиента возможно повышение класса автомобиля и добавление детских сидений.'}</span>
            </div>
        </div >
    );
}