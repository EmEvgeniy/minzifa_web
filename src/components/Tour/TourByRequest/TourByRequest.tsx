import { useTranslations } from "use-intl";

export const TourByRequest = ({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) => {
    const t = useTranslations('Tour');

    const handleScroll = () => {
        ref?.current?.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    }

    return (
        <div className={'sticky top-36'}>
            <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
                <div className="text-base">
                    {t('by_request.text')}
                </div>
                <button
                    onClick={() => handleScroll()}
                    className="text-center w-full rounded-4xl bg-[#27A430] text-white p-4 cursor-pointer transition-all duration-300 hover:bg-[#208B28]"
                >
                    {t('by_request.button')}
                </button>
            </div>
        </div>
    )
};