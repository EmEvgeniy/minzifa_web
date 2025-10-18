import React, { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils';
import { useDotButton } from './useDotsButton';
import { EmblaCarouselType } from 'embla-carousel';

interface DotButtonProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

export const DotButton: React.FC<DotButtonProps> = ({ active = false, className, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'relative w-4 h-4 rounded-full transition-all duration-300 ease-out',
        'cursor-pointer outline-none group',
        active
          ? 'bg-[#16372D] scale-125 shadow-[0_0_0_4px_rgba(22,55,45,0.2)]'
          : 'bg-gray-300 hover:bg-gray-400 hover:scale-110',
        className,
      )}
    >
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-all duration-300',
          active ? 'ring-2 ring-[#16372D] ring-offset-2 ring-offset-white' : 'ring-0',
        )}
      />
    </button>
  );
};

export const ECDotsWrapper = ({
  emblaApi,
  className,
}: {
  emblaApi: EmblaCarouselType | undefined;
  className?: string;
}) => {
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-3 mt-6', className)}>
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          active={index === selectedIndex}
        />
      ))}
    </div>
  );
};
