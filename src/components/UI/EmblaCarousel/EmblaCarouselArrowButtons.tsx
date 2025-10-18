import { cn } from '@/utils';
import { ComponentPropsWithRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { usePrevNextButtons } from './usePrevNextButtons';
import { EmblaCarouselType } from 'embla-carousel';

type VariantType = 'light' | 'dark';

type PropType = ComponentPropsWithRef<'button'> & {
  variant?: VariantType;
};

type WrapperProps = {
  emblaApi: EmblaCarouselType | undefined;
  className?: string;
  variant?: VariantType;
  prevBtnRest?: PropType;
  nextBtnRest?: PropType;
};

const baseButtonStyles =
  'cursor-pointer flex items-center justify-center p-3 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  light: 'text-black bg-white hover:bg-gray-100',
  dark: 'bg-[#16372D] text-white hover:bg-[#16372D]',
};

export const PrevButton: React.FC<PropType> = ({
  className,
  children,
  variant = 'light',
  ...rest
}) => (
  <button type="button" {...rest} className={cn(baseButtonStyles, variants[variant], className)}>
    <FaChevronLeft />
    {children}
  </button>
);

export const NextButton: React.FC<PropType> = ({
  className,
  children,
  variant = 'light',
  ...rest
}) => (
  <button type="button" {...rest} className={cn(baseButtonStyles, variants[variant], className)}>
    <FaChevronRight />
    {children}
  </button>
);

export const ECArrowWrapper = ({
  emblaApi,
  className,
  variant = 'light',
  prevBtnRest,
  nextBtnRest,
}: WrapperProps) => {
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  // 👇 Если внутри кнопки variant не указан — берем общий из пропа wrapper’а
  const prevVariant = prevBtnRest?.variant || variant;
  const nextVariant = nextBtnRest?.variant || variant;

  return (
    <div className={cn('flex justify-end mt-4 gap-3', className)}>
      <PrevButton
        {...prevBtnRest}
        variant={prevVariant}
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
      />
      <NextButton
        {...nextBtnRest}
        variant={nextVariant}
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
      />
    </div>
  );
};
