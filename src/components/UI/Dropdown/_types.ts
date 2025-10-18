import { ReactNode } from 'react';

export interface DropdownOption {
  label?: string;
  value: string | number;
}

/**
 * Пропсы для Dropdown-компонента
 */
export interface DropdownProps<T extends Record<string, unknown>> {
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
  options?: T[];
  placeholder?: string;
  labelKey?: keyof T & string;
  valueKey?: keyof T & string;
  getLabel?: (opt: T) => string;
  getValue?: (opt: T) => string | number;
  className?: string;
  summaryClassName?: string;
  detailsClassName?: string;

  /**
   * Дочерние элементы могут быть:
   * 1️⃣ Функцией (рендер-проп)
   * 2️⃣ Обычными JSX элементами (DropdownSummary, DropdownDetails)
   */
  children?:
    | ReactNode
    | ((args: {
        isOpen: boolean;
        toggle: (state?: boolean) => void;
        value?: string | number;
      }) => ReactNode);
}

/**
 * Контекст состояния Dropdown
 */
export interface DropdownContextType {
  isOpen: boolean;
  toggle: (state?: boolean) => void;
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
}

/**
 * Компонент-обёртка для кликабельной зоны (Summary)
 */
export interface DropdownSummaryProps {
  children:
    | ReactNode
    | ((args: { isOpen: boolean; toggle: (state?: boolean) => void }) => ReactNode);
  className?: string;
}

/**
 * Контейнер с выпадающим списком (Details)
 */
export interface DropdownDetailsProps {
  children:
    | ReactNode
    | ((args: { isOpen: boolean; toggle: (state?: boolean) => void }) => ReactNode);
  className?: string;
}

/**
 * Отдельный пункт меню (Item)
 */
export interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}
