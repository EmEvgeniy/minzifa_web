import { cn } from '@/utils/utils';
import React, { useState, createContext, useContext, Children, isValidElement, useEffect } from 'react';
import { CustomAccordionContextType, CustomAccordionDetailsProps, CustomAccordionProps, CustomAccordionSummaryProps } from './_types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';

const CustomAccordionContext = createContext<CustomAccordionContextType | undefined>(undefined);

const useCustomAccordion = () => {
    const context = useContext(CustomAccordionContext);
    if (!context) {
        throw new Error('useCustomAccordion must be used within an CustomAccordion component');
    }
    return context;
};

/**
 * Основной компонент для управления состоянием аккордеона.
 * Использует контекст для передачи состояния между CustomAccordionSummary и CustomAccordionDetails.
 */
export const CustomAccordion: React.FC<CustomAccordionProps> = ({
    children,
    defaultExpandedIndex = -1,
    expandedIndexes: controlledExpandedIndexes,
    onExpandedIndexesChange,
    className
}) => {
    const [uncontrolledExpandedIndexes, setUncontrolledExpandedIndexes] = useState<number[]>(
        defaultExpandedIndex !== -1 ? [defaultExpandedIndex] : []
    );

    const isControlled = controlledExpandedIndexes !== undefined; // Проверка на undefined для массива
    const currentExpandedIndexes = isControlled ? controlledExpandedIndexes : uncontrolledExpandedIndexes;

    useEffect(() => {
        if (!isControlled) {
            setUncontrolledExpandedIndexes(defaultExpandedIndex !== -1 ? [defaultExpandedIndex] : []);
        }
    }, [defaultExpandedIndex, isControlled]);

    const handleToggle = (index: number) => {
        const newIndexes = currentExpandedIndexes.includes(index)
            ? currentExpandedIndexes.filter(i => i !== index)
            : [...currentExpandedIndexes, index];

        if (isControlled && onExpandedIndexesChange) {
            onExpandedIndexesChange(newIndexes);
        } else {
            setUncontrolledExpandedIndexes(newIndexes);
        }
    };

    return (
        <div className={cn("rounded-xl bg-white px-5 overflow-hidden", className)}>
            {Children.map(Children.toArray(children).filter(isValidElement), (CustomAccordionChild, index) => {
                const expanded = currentExpandedIndexes.includes(index);
                const toggleExpanded = () => handleToggle(index);

                return (
                    <CustomAccordionContext.Provider key={index} value={{ expanded, toggleExpanded }}>
                        {CustomAccordionChild}
                    </CustomAccordionContext.Provider>
                );
            })}
        </div>
    );
};

/**
 * Заголовок аккордеона. При клике переключает видимость CustomAccordionDetails.
 */
export const CustomAccordionSummary: React.FC<CustomAccordionSummaryProps> = ({
    children,
    expandIcon,
    className = '',
    ...rest
}) => {
    const { expanded, toggleExpanded } = useCustomAccordion();

    return (
        <div
            tabIndex={0}
            className={cn(
                'flex items-center justify-between py-6 cursor-pointer select-none transition-colors duration-200 border-b border-gray-200',
                'transition-[border-radius] duration-300 ease-in-out',
                expanded ? 'rounded-t-2xl' : 'rounded-2xl',
                className,
            )}
            style={{ willChange: 'border-radius' }}
            onClick={toggleExpanded}
            {...rest}
            role="button"
            aria-expanded={expanded}
        >
            <div className="flex-grow">{children}</div>
            {expandIcon ? (
                <div className={`ml-2 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                    {expandIcon}
                </div>
            ) : (
                <div className="ml-2">
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            )}
        </div>
    );
};

/**
 * Содержимое панели аккордеона. Скрывается или отображается в зависимости от состояния.
 */
export const CustomAccordionDetails: React.FC<CustomAccordionDetailsProps> = ({ children, className = '' }) => {
    const { expanded } = useCustomAccordion();

    return (
        <AnimatePresence>
            {expanded && (
                <motion.div
                    key="accodion-content"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={cn(
                        `bg-white overflow-hidden transition-all duration-300 ease-in-out`,
                        expanded ? 'max-h-full opacity-100 py-5 rounded-b-2xl' : 'max-h-0 opacity-0 p-0 rounded-none',
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};