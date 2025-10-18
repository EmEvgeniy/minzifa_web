import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

export interface EmblaCarouselProps {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  className?: string;
  children: React.ReactNode;
}

export interface EmblaCarouselContextValue {
  emblaRef: (node: HTMLElement | null) => void;
  emblaApi?: EmblaCarouselType;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollTo: (index: number) => void;
  scrollProgress: number;
}

export interface EmblaSlideProps {
  className?: string;
  children: React.ReactNode;
}

export interface EmblaNavigationState {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollProgress: number;
}

export interface SliderContainerProps<T> {
  /** Массив данных для слайдов */
  slides: T[];
  /** Функция рендера карточки слайда */
  renderCard: (slide: T, index: number) => React.ReactNode;
  /** Дополнительные настройки слайдера */
  sliderOptions?: {
    autoplay?: boolean;
    autoplayDelay?: number;
    loop?: boolean;
    className?: string;
    options?: {
      align?: 'start' | 'center' | 'end';
      skipSnaps?: boolean;
      dragFree?: boolean;
      containScroll?: 'trimSnaps' | 'keepSnaps';
      slidesToScroll?: number;
    };
  };
  /** Показывать навигационные кнопки */
  showNavigation?: boolean;
  /** Показывать пагинацию */
  showPagination?: boolean;
  /** Дополнительные настройки навигации */
  navigationOptions?: {
    prevButtonClassName?: string;
    nextButtonClassName?: string;
    className?: string;
  };
  /** Дополнительные настройки пагинации */
  paginationOptions?: {
    className?: string;
  };
  /** Обработчик клика по слайду */
  onSlideClick?: (slide: T, index: number) => void;
  /** Кастомный компонент для отображения пустого состояния */
  emptyState?: React.ReactNode;
  /** Дополнительный CSS класс для контейнера */
  className?: string;
  /** Заголовок слайдера */
  title?: string;
  /** Описание слайдера */
  description?: string;
}

// Используем тип напрямую из библиотеки embla-carousel
export type EmblaCarouselApi = EmblaCarouselType;
